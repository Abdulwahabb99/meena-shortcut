import { useState, type KeyboardEvent } from "react";
import { Box, TextField, InputAdornment, CircularProgress } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { alpha } from "@mui/material/styles";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

type ShortcutLinkFormProps = {
  title: string;
  description: string;
  placeholder: string;
  submitLabel: string;
  helperText: string;
  isRTL?: boolean;
  errorMessages: {
    required: string;
    invalid: string;
    network: string;
    timeout: string;
    unexpectedResponse: string;
  };
  onCreate: (url: string) => Promise<{
    success: boolean;
    errorKey?: string;
    rawMessage?: string;
  }>;
  onInputChange?: () => void;
};

function ShortcutLinkForm({
  title,
  description,
  placeholder,
  submitLabel,
  helperText,
  isRTL: _isRTL,
  errorMessages,
  onCreate,
  onInputChange,
}: ShortcutLinkFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resolveError = (key?: string, raw?: string) => {
    if (key === "server" && raw) return raw;
    switch (key) {
      case "invalidUrl":
        return errorMessages.invalid;
      case "network":
        return errorMessages.network;
      case "timeout":
        return errorMessages.timeout;
      case "unexpectedResponse":
        return errorMessages.unexpectedResponse;
      default:
        return raw || errorMessages.network;
    }
  };

  const handleSubmit = async () => {
    const trimmed = value.trim();
    setError("");

    if (!trimmed) {
      setError(errorMessages.required);
      return;
    }

    setLoading(true);
    try {
      const result = await onCreate(trimmed);
      if (!result.success) {
        setError(resolveError(result.errorKey, result.rawMessage));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <Box>
      <MDTypography
        variant="h5"
        fontWeight="bold"
        color="dark"
        mb={1}
        sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
      >
        {title}
      </MDTypography>
      <MDTypography
        variant="body2"
        color="text"
        sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" }, lineHeight: 1.65 }}
      >
        {description}
      </MDTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          direction: "inherit",
          gap: 1.5,
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onInputChange?.();
          }}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error}
          variant="outlined"
          size="medium"
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon sx={{ color: "text.secondary", fontSize: 22 }} aria-hidden />
              </InputAdornment>
            ),
            sx: (theme) => ({
              height: 48,
              borderRadius: 2,
              bgcolor: theme.palette.common.white,
              "& fieldset": {
                borderWidth: 1,
                borderColor: theme.palette.grey[300],
              },
              "&:hover:not(.Mui-focused):not(.Mui-disabled) fieldset": {
                borderColor: theme.palette.grey[400],
              },
              "&.Mui-focused": {
                bgcolor: "#F4F5F7",
                "& fieldset": {
                  border: "none",
                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}, 0 0 0 6px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
              "&.Mui-focused:hover": {
                bgcolor: "#F4F5F7",
                "& fieldset": {
                  border: "none",
                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}, 0 0 0 6px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
            }),
          }}
          sx={{
            width: { xs: "100%", sm: 1 },
            flex: { sm: 1 },
            maxWidth: "100%",
            minWidth: 0,
          }}
        />
        <MDButton
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={loading}
          sx={{
            height: 48,
            borderRadius: 2,
            px: 2.5,
            flexShrink: 0,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            direction: "inherit",
            gap: 1,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "center", sm: "flex-start" },
            minWidth: { sm: 200 },
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            <>
              {submitLabel}
              <AutoAwesomeIcon sx={{ fontSize: 20, color: "#FFFFFF" }} />
            </>
          )}
        </MDButton>
      </Box>
      {helperText && (
        <MDTypography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          {helperText}
        </MDTypography>
      )}
    </Box>
  );
}

export default ShortcutLinkForm;
