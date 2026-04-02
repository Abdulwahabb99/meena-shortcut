import { Box } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";

/**
 * Read-only customer details (checkout.* + orderFlow.* translation keys).
 */
function CustomerInfoCard({ customer, sx }) {
  const { t } = useTranslate();

  return (
    <MDBox
      sx={{
        mb: 3,
        borderRadius: 2,
        bgcolor: "inherit",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid",
        borderColor: "grey.200",
        overflow: "hidden",
        ...sx,
      }}
    >
      <MDBox
        sx={{
          p: { xs: 2, sm: 3 },
          borderBottom: 1,
          borderColor: "grey.200",
          bgcolor: "grey.50",
        }}
      >
        <MDTypography
          variant="h6"
          fontWeight="bold"
          color="dark"
          sx={{ fontSize: "1rem" }}
        >
          {t("checkout.customerInfo")}
        </MDTypography>
        <MDTypography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.25 }}
        >
          {t("checkout.customerInfoSubtitle")}
        </MDTypography>
      </MDBox>
      <MDBox
        sx={{
          p: { xs: 2, sm: 3 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        <Box>
          <MDTypography
            variant="caption"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
          >
            {t("orderFlow.firstName")}
          </MDTypography>
          <MDTypography
            variant="body2"
            fontWeight={500}
            color="dark"
            sx={{ fontSize: "0.8125rem" }}
          >
            {customer.firstName}
          </MDTypography>
        </Box>
        <Box>
          <MDTypography
            variant="caption"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
          >
            {t("orderFlow.lastName")}
          </MDTypography>
          <MDTypography
            variant="body2"
            fontWeight={500}
            color="dark"
            sx={{ fontSize: "0.8125rem" }}
          >
            {customer.lastName}
          </MDTypography>
        </Box>
        <Box>
          <MDTypography
            variant="caption"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
          >
            {t("orderFlow.phone")}
          </MDTypography>
          <MDTypography
            variant="body2"
            fontWeight={500}
            color="dark"
            sx={{ fontSize: "0.8125rem" }}
          >
            {customer.phone}
          </MDTypography>
        </Box>
        <Box>
          <MDTypography
            variant="caption"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
          >
            {t("orderFlow.idNumber")}
          </MDTypography>
          <MDTypography
            variant="body2"
            fontWeight={500}
            color="dark"
            sx={{ fontSize: "0.8125rem" }}
          >
            {customer.idNumber}
          </MDTypography>
        </Box>
      </MDBox>
    </MDBox>
  );
}

CustomerInfoCard.propTypes = {
  customer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    idNumber: PropTypes.string,
  }).isRequired,
  sx: PropTypes.object,
};

CustomerInfoCard.defaultProps = {
  sx: undefined,
};

export default CustomerInfoCard;
