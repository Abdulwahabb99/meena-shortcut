import { useCallback, useState } from "react";
import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import { createShortLink } from "services/shortLinkApi";
import ShortcutLinkForm from "./components/ShortcutLinkForm";
import ShortLinkResult from "./components/ShortLinkResult";

function Home() {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const cardStyle = {
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    bgcolor: "inherit",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.08)"}`,
  };

  const pageTitle = t("home.title");

  const handleCreate = useCallback(async (raw: string) => {
    const result = await createShortLink(raw);
    if (result.ok === true) {
      setShortUrl(result.shortUrl);
      return { success: true as const };
    }
    return {
      success: false as const,
      errorKey: result.code,
      rawMessage: result.serverMessage,
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
          p: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 4, sm: 5 },
        }}
      >
        <MDBox sx={{ flex: 1, minHeight: 0, overflowX: "hidden" }}>
          {pageTitle ? (
            <MDTypography
              variant="h4"
              fontWeight="bold"
              color="dark"
              mb={{ xs: 2, sm: 3 }}
              sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
            >
              {pageTitle}
            </MDTypography>
          ) : null}

          <MDBox sx={{ ...cardStyle, maxWidth: 920, mx: "auto" }}>
            <ShortcutLinkForm
              onInputChange={() => setShortUrl(null)}
              onCreate={handleCreate}
              title={t("home.heroTitle")}
              description={t("home.heroDescription")}
              placeholder={t("home.urlPlaceholder")}
              submitLabel={t("home.createShortcut")}
              helperText={t("home.helperText")}
              isRTL={isRTL}
              errorMessages={{
                required: t("home.errors.required"),
                invalid: t("home.errors.invalid"),
                network: t("home.errors.network"),
                timeout: t("home.errors.timeout"),
                unexpectedResponse: t("home.errors.unexpectedResponse"),
              }}
            />
            {shortUrl ? (
              <ShortLinkResult
                shortUrl={shortUrl}
                label={t("home.shortLinkLabel")}
                copyLabel={t("home.copyLink")}
                copiedToast={t("home.copiedToast")}
                copyFailedToast={t("home.copyFailedToast")}
              />
            ) : null}
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
