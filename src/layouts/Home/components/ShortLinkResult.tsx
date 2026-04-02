import { useState, useCallback } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { alpha, useTheme } from "@mui/material/styles";
import MDTypography from "components/MDTypography";
import { toast } from "react-toastify";

type ShortLinkResultProps = {
  shortUrl: string;
  label: string;
  copyLabel: string;
  copiedToast: string;
  copyFailedToast: string;
};

function ShortLinkResult({
  shortUrl,
  label,
  copyLabel,
  copiedToast,
  copyFailedToast,
}: ShortLinkResultProps) {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success(copiedToast);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(copyFailedToast);
    }
  }, [shortUrl, copiedToast, copyFailedToast]);

  const border = meena.border || "rgba(140, 86, 255, 0.12)";
  const softBg = meena.activeBg || alpha(theme.palette.primary.main, 0.08);

  return (
    <Box
      sx={{
        mt: { xs: 2.5, sm: 3 },
        pt: { xs: 2.5, sm: 3 },
        borderTop: 1,
        borderColor: "grey.200",
      }}
    >
      <MDTypography
        variant="caption"
        fontWeight={600}
        color="text.secondary"
        sx={{
          letterSpacing: 0.6,
          textTransform: "uppercase",
          display: "block",
          mb: 1.25,
        }}
      >
        {label}
      </MDTypography>
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: { xs: 1, sm: 1.5 },
          flexDirection: { xs: "column", sm: "row" },
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          bgcolor: softBg,
          border: `1px solid ${border}`,
          boxShadow: "0 4px 20px rgba(140, 86, 255, 0.06)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            px: { xs: 1, sm: 1.5 },
            py: 1,
            borderRadius: 1.5,
            bgcolor: "common.white",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          }}
        >
          <MDTypography
            component="a"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            fontWeight={600}
            color="primary"
            sx={{
              wordBreak: "break-all",
              textDecoration: "none",
              lineHeight: 1.5,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {shortUrl}
          </MDTypography>
        </Box>
        <Tooltip title={copyLabel}>
          <IconButton
            onClick={() => void handleCopy()}
            aria-label={copyLabel}
            sx={{
              alignSelf: { xs: "stretch", sm: "center" },
              height: { sm: 48 },
              width: { xs: "100%", sm: 48 },
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              flexShrink: 0,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {copied ? (
              <CheckIcon sx={{ fontSize: 22 }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 22 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ShortLinkResult;
