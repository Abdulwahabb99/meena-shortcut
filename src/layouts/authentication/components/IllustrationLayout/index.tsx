import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useMaterialUIController } from "context";
import widgetImage from "assets/images/illustrations/Widget.png";
function IllustrationLayout({
  header = "",
  title = "",
  description = "",
  illustration = "",
  children,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <PageLayout background="white">
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main,
        }}
      >
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
          >
            <MDBox py={3} px={3} textAlign="center">
              {!header ? (
                <>
                  <MDBox mb={1} textAlign="center">
                    <MDTypography variant="h4" fontWeight="bold">
                      {title}
                    </MDTypography>
                  </MDBox>
                  <MDTypography variant="body2" color="text">
                    {description}
                  </MDTypography>
                </>
              ) : (
                header
              )}
            </MDBox>
            <MDBox p={3}>{children}</MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={6} pr={1} py={1}>
          <MDBox
            display={{ xs: "none", lg: "flex" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{
              height: "calc(98vh)",
              backgroundImage: `url(${illustration})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              overflow: "hidden",
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            <Box sx={{ mt: 8, color: "#FFF !important" }}>
              <Typography fontSize={"32px"} fontWeight="600" mb={1}>
                مرحبًا بك في تجهيز بلس!{" "}
              </Typography>
              <Typography fontSize={"22px"} mb={4}>
                سجّل الدخول لإدارة نشاطك التجاري والوصول إلى كل المزايا.{" "}
              </Typography>
              <Box
                component="img"
                src={widgetImage}
                alt="Widget"
                sx={{
                  maxWidth: "90%",
                  height: "auto",
                }}
              />
            </Box>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

IllustrationLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.string,
};

export default IllustrationLayout;
