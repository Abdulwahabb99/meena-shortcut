import axios from "axios";

const CREATE_URL = "https://link.meena-health.com/create";

function extractShortUrl(payload: unknown): string | null {
  if (typeof payload === "string") {
    const t = payload.trim();
    if (/^https?:\/\//i.test(t)) return t;
    return null;
  }
  if (!payload || typeof payload !== "object") return null;

  const obj = payload as Record<string, unknown>;

  const tryString = (v: unknown): string | null => {
    if (typeof v !== "string") return null;
    const t = v.trim();
    return /^https?:\/\//i.test(t) ? t : null;
  };

  for (const key of [
    "shortUrl",
    "short_url",
    "shortLink",
    "short_link",
    "shortcut",
    "result",
    "link",
  ] as const) {
    const s = tryString(obj[key]);
    if (s) return s;
  }

  const data = obj.data;
  if (data !== undefined) {
    const nested = extractShortUrl(data);
    if (nested) return nested;
  }

  const url = tryString(obj.url);
  if (url && url.includes("link.meena-health.com")) return url;

  return null;
}

function normalizeUserUrl(input: string): string {
  const t = input.trim();
  if (!t) return t;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export type CreateShortLinkErrorCode =
  | "invalidUrl"
  | "unexpectedResponse"
  | "timeout"
  | "network"
  | "server";

export type CreateShortLinkResult =
  | { ok: true; shortUrl: string }
  | { ok: false; code: CreateShortLinkErrorCode; serverMessage?: string };

export async function createShortLink(rawUrl: string): Promise<CreateShortLinkResult> {
  const url = normalizeUserUrl(rawUrl);
  try {
    new URL(url);
  } catch {
    return { ok: false, code: "invalidUrl" };
  }

  try {
    const { data } = await axios.post<unknown>(
      CREATE_URL,
      { originalUrl: url },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30_000,
      },
    );

    const shortUrl = extractShortUrl(data);
    if (!shortUrl) {
      return { ok: false, code: "unexpectedResponse" };
    }
    return { ok: true, shortUrl };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const body = e.response?.data;
      const msg =
        (body && typeof body === "object" && "message" in body && typeof (body as { message: unknown }).message === "string"
          ? (body as { message: string }).message
          : null) ||
        (typeof body === "string" ? body : null);
      if (msg) {
        return { ok: false, code: "server", serverMessage: msg };
      }
      if (e.code === "ECONNABORTED") {
        return { ok: false, code: "timeout" };
      }
    }
    return { ok: false, code: "network" };
  }
}
