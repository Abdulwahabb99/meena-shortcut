import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import { useCart } from "shared/context/CartContext";
import CartFooterBar from "components/CartFooterBar";
import OrderStepper from "components/OrderStepper/OrderStepper";
import { RHFTextField } from "components/hook-form";
import { formatPriceWithCurrency } from "utils/formatPrice";
import { createCustomerDetailsSchema } from "./customerDetailsSchema";

function outlinedInputSlotProps(theme) {
  return {
    sx: {
      borderRadius: 2,
      bgcolor: theme.palette.common.white,
      alignItems: "center",
      "& .MuiOutlinedInput-input": {
        py: 1.25,
        height: "auto",
      },
      "& fieldset": {
        borderWidth: 1,
        borderColor: theme.palette.grey[300],
      },
      "&:hover:not(.Mui-focused) fieldset": {
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
    },
  };
}

/**
 * Isolated so `key={locale}` remounts react-hook-form + yup resolver when language changes.
 */
function CustomerDetailsFormMain() {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};
  const { t } = useTranslate();
  const { isRTL, locale } = useLocales();
  const navigate = useNavigate();
  const {
    customerDetails,
    setCustomerDetails,
    totalItems,
    totalPrice,
  } = useCart();

  const validationSchema = useMemo(() => createCustomerDetailsSchema(t), [t]);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: customerDetails.firstName ?? "",
      lastName: customerDetails.lastName ?? "",
      phone: customerDetails.phone ?? "",
      idNumber: customerDetails.idNumber ?? "",
    },
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSubmit = useCallback(
    (data) => {
      setCustomerDetails(data);
      navigate("/checkout");
    },
    [setCustomerDetails, navigate],
  );

  const cardStyle = {
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    bgcolor: "inherit",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.08)"}`,
  };

  const inputSlot = outlinedInputSlotProps(theme);

  const fieldLabelSx = {
    display: "block",
    mb: 0.75,
    fontWeight: 600,
    color: "text.secondary",
    fontSize: "0.8125rem",
    cursor: "pointer",
  };

  return (
    <FormProvider {...methods}>
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
          p: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 26, sm: 30 },
        }}
      >
        <MDBox
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pb: { xs: 4, sm: 5 },
          }}
        >
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              cursor: "pointer",
              width: "fit-content",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={handleBack}
          >
            <Icon sx={{ fontSize: 24 }}>
              {isRTL ? "arrow_forward" : "arrow_back"}
            </Icon>
            <MDTypography variant="body1" fontWeight="medium" color="dark">
              {t("orderFlow.backToMedications")}
            </MDTypography>
          </MDBox>

          <MDTypography
            variant="h4"
            fontWeight="bold"
            color="dark"
            mb={{ xs: 2, sm: 3 }}
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
          >
            {t("orderFlow.detailsTitle")}
          </MDTypography>

          <MDBox sx={{ ...cardStyle }}>
            <MDTypography
              variant="h5"
              fontWeight="bold"
              color="dark"
              mb={1}
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              {t("orderFlow.detailsSectionTitle")}
            </MDTypography>
            <MDTypography
              variant="body2"
              color="text"
              sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
            >
              {t("orderFlow.detailsSectionDescription")}
            </MDTypography>

            <MDBox
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MDTypography
                    component="label"
                    htmlFor="customer-firstName"
                    variant="body2"
                    sx={fieldLabelSx}
                  >
                    {t("orderFlow.firstName")}
                  </MDTypography>
                  <RHFTextField
                    id="customer-firstName"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    InputProps={inputSlot}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDTypography
                    component="label"
                    htmlFor="customer-lastName"
                    variant="body2"
                    sx={fieldLabelSx}
                  >
                    {t("orderFlow.lastName")}
                  </MDTypography>
                  <RHFTextField
                    id="customer-lastName"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    InputProps={inputSlot}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDTypography
                    component="label"
                    htmlFor="customer-phone"
                    variant="body2"
                    sx={fieldLabelSx}
                  >
                    {t("orderFlow.phone")}
                  </MDTypography>
                  <RHFTextField
                    id="customer-phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    digitsOnly
                    inputProps={{ inputMode: "numeric", maxLength: 9 }}
                    InputProps={inputSlot}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDTypography
                    component="label"
                    htmlFor="customer-idNumber"
                    variant="body2"
                    sx={fieldLabelSx}
                  >
                    {t("orderFlow.idNumber")}
                  </MDTypography>
                  <RHFTextField
                    id="customer-idNumber"
                    name="idNumber"
                    variant="outlined"
                    fullWidth
                    digitsOnly
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    InputProps={inputSlot}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>

        <CartFooterBar
          stepper={<OrderStepper activeStep={1} />}
          leftIcon="shopping_cart"
          summaryText={`${totalItems} ${t("home.itemsInCart")}`}
          totalPriceText={formatPriceWithCurrency(totalPrice, locale)}
          actionLabel={t("orderFlow.continueToCheckout")}
          onAction={() => handleSubmit(onSubmit)()}
        />
      </MDBox>
    </FormProvider>
  );
}

function CustomerDetails() {
  const { t } = useTranslate();
  const { locale } = useLocales();
  const navigate = useNavigate();
  const { medications } = useCart();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (medications.length === 0) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <MDTypography variant="h5" color="text.secondary" mb={2}>
            {t("checkout.emptyCart")}
          </MDTypography>
          <MDTypography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={handleBack}
          >
            {t("checkout.backToHome")}
          </MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomerDetailsFormMain key={locale} />
    </DashboardLayout>
  );
}

export default CustomerDetails;
