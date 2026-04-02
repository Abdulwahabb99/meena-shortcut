import { useState, type KeyboardEvent } from "react";
import {
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

type MedicationInputErrorMessages = {
  required?: string;
  invalid?: string;
  notFound?: string;
};

type MedicationInputProps = {
  onAdd: (
    code: string,
  ) => Promise<{ success: boolean; error?: string }>;
  helperText: string;
  title: string;
  description: string;
  placeholder: string;
  addLabel: string;
  isRTL?: boolean;
  errorMessages?: MedicationInputErrorMessages;
};

function MedicationInput({
  onAdd,
  helperText,
  title,
  description,
  placeholder,
  addLabel,
  isRTL: _isRTL,
  errorMessages = {},
}: MedicationInputProps) {
  const [value, setValue] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmed = value.trim();
    setError("");

    if (!trimmed) {
      setError(errorMessages.required || "Required");
      return;
    }

    if (!/^\d+$/.test(trimmed)) {
      setError(errorMessages.invalid || "Invalid format");
      return;
    }

    const result = await onAdd(trimmed);
    if (result.success) {
      setValue("");
    } else {
      setError(result.error || errorMessages.notFound || "Drug not found");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
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
        sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
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
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error}
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "text.secondary",
                    fontSize: 22,
                  }}
                  aria-hidden
                />
              </InputAdornment>
            ),
            sx: (theme) => ({
              height: 48,
              borderRadius: 2,
              // حالة عادية (بدون focus): يبان إنه input
              bgcolor: theme.palette.common.white,
              "& fieldset": {
                borderWidth: 1,
                borderColor: theme.palette.grey[300],
              },
              "&:hover:not(.Mui-focused) fieldset": {
                borderColor: theme.palette.grey[400],
              },
              // نفس منطق الـ focus القديم
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
            width: { xs: "100%", sm: 480 },
            maxWidth: "100%",
            flexShrink: 1,
            minWidth: 0,
          }}
        />
        <MDButton
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSubmit}
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
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
        >
          {addLabel}
          <AddIcon sx={{ fontSize: 22, color: "#FFFFFF" }} />
        </MDButton>
      </Box>
      {helperText && (
        <MDTypography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          {helperText}
        </MDTypography>
      )}
    </Box>
  );
}

export default MedicationInput;
