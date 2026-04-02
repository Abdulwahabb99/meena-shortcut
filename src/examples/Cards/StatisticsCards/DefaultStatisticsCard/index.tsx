import type { ReactNode } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 3 PRO React contexts
import { useMaterialUIController } from "context";
import { Skeleton } from "@mui/material";

function DefaultStatisticsCard({
  title,
  count,
  percentage = {
    color: "success",
    value: "",
    label: "",
  },
  dropdown = false,
  isLoading = false,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  type DropdownCfg = {
    action: () => void;
    value: ReactNode;
    menu: ReactNode;
  };
  const d = dropdown as false | DropdownCfg;
  const dropdownMenu = d && typeof d === "object" ? d : null;

  return (
    <Card>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={7}>
            <MDBox mb={0.5} lineHeight={1}>
              <MDTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                {title}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography variant="h5" fontWeight="bold">
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height="100%" />
                ) : (
                  count
                )}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="bold"
                color={percentage.color}
              >
                {percentage.value}&nbsp;
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={darkMode ? "text" : "secondary"}
                >
                  {percentage.label}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={5}>
            {dropdownMenu && (
              <MDBox width="100%" textAlign="right" lineHeight={1}>
                <MDTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="regular"
                  sx={{ cursor: "pointer" }}
                  onClick={dropdownMenu.action}
                >
                  {dropdownMenu.value}
                </MDTypography>
                {dropdownMenu.menu}
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
      value: PropTypes.string,
    }),
  ]),
  isLoading: PropTypes.bool,
};

export default DefaultStatisticsCard;
