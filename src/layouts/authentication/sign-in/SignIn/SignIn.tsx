import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { getSignInValidationSchema } from "./signInValidation";
import { useAuth } from "shared/hooks/useAuth";
import { useLoginMutation } from "services/mutations/useLoginMutation";
import { toast } from "react-toastify";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import AuthLanguageSwitcher from "layouts/authentication/components/AuthLanguageSwitcher";
import EmailIcon from "icons/EmailIcon";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";
import SignInHeroLottie from "components/SignInHeroLottie";

const SKIP_API_LOGIN = true;
const LOGO_PATH = "/meena-logo.png";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const { login } = useAuth();
  const loginMutation = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "user@meenahealth.com",
      password: "password",
    },
    validationSchema: getSignInValidationSchema(t),
    onSubmit: async (values, { setSubmitting }) => {
      if (SKIP_API_LOGIN) {
        login({
          data: {
            id: 1,
            name: "محمد عبدالله العتيبي",
            email: values.email || "user@meenahealth.com",
            phone: "+966 50 123 4567",
            address: "الرياض، شارع الملك فهد، حي العليا، مبنى 123",
            role: "user",
          },
        });
        return;
      }

      loginMutation.mutate(values, {
        onSuccess: (data) => {
          login(data);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: { xs: "auto", md: "hidden" },
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: isRTL ? "row" : "row-reverse",
        },
        direction: isRTL ? "rtl" : "ltr",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Image Panel - Hidden on small/medium, visible on lg+ */}
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          p: 4,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <SignInHeroLottie
            sizes={{ lg: 420, xl: 540, xxl: 660 }}
          />
        </Box>
      </Box>

      {/* Form Panel - Full width when image hidden, 45% on lg+ */}
      <Box
        sx={{
          width: { xs: "100%", lg: "45%" },
          minHeight: { xs: "100vh", lg: "auto" },
          height: { xs: "100vh", lg: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", lg: "space-between" },
          overflow: { xs: "auto", lg: "hidden" },
          px: { xs: 3, md: 6, lg: 10 },
          py: { xs: 5, md: 6 },
          pt: { xs: 8, lg: 6 },
          backgroundColor: "background.paper",
        }}
      >
        {/* Header: Logo + Language */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: isRTL ? "row" : "row-reverse",
            mb: { xs: 5, lg: 2 },
            flexShrink: 0,
          }}
        >
          <AuthLanguageSwitcher />

          <Box
            component="img"
            src={LOGO_PATH}
            alt="Meena"
            sx={{
              width: 160,
              height: "auto",
              maxHeight: 56,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        </Stack>

        {/* Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 420,
            width: "100%",
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              textAlign: isRTL ? "right" : "left",
              color: "text.primary",
            }}
          >
            {t("auth.welcome")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: "text.secondary",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("auth.description")}
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
          >
            <Box mb={2}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("auth.email")}
              </Typography>
              <TextField
                name="email"
                placeholder={t("auth.emailPlaceholder")}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginInlineEnd: 0,
                        "& svg": { width: 20, height: 20, flexShrink: 0 },
                      }}
                    >
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    alignItems: "center",
                    "&.Mui-focused": {
                      bgcolor: "background.paper",
                      "& fieldset": {
                        borderColor: "primary.main",
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box mb={3}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("auth.password")}
              </Typography>
              <TextField
                name="password"
                placeholder={t("auth.passwordPlaceholder")}
                type={showPassword ? "text" : "password"}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.password && formik.errors.password,
                )}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mr: 0,
                        "& svg": { width: 20, height: 20, flexShrink: 0 },
                      }}
                    >
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => setShowPassword((v) => !v)}
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        ml: 0,
                        "& svg": { width: 20, height: 20, flexShrink: 0 },
                      }}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOutlineIcon />}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    alignItems: "center",
                    "&.Mui-focused": {
                      bgcolor: "background.paper",
                      "& fieldset": {
                        borderColor: "primary.main",
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />
            </Box>

            <MDButton
              variant="gradient"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {loginMutation.isPending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("auth.submit")
              )}
            </MDButton>
          </Box>
        </Box>

        {/* Footer */}
        <Typography
          variant="caption"
          sx={{
            pt: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          © {new Date().getFullYear()} Meena Health. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default SignIn;
