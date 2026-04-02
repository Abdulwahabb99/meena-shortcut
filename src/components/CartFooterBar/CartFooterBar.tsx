import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import useLocales from "shared/hooks/useLocales";

/**
 * Fixed bottom bar for cart (home) and checkout pages.
 * Optional `stepper` renders above the actions row (order flow progress).
 */
function CartFooterBar({
  summaryText,
  totalPriceText,
  actionLabel,
  onAction,
  disabled = false,
  leftIcon = null,
  stepper = null,
}) {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { isRTL } = useLocales();
  const sidenavMargin = miniSidenav ? 73 : 240;

  return (
    <Box
      sx={(theme) => {
        const { breakpoints, functions: { pxToRem }, zIndex } = theme;
        return {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          [breakpoints.up("xl")]: {
            ...(isRTL ? { right: pxToRem(sidenavMargin) } : { left: pxToRem(sidenavMargin) }),
          },
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          bgcolor: "#FFF",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
          borderTop: "1px solid",
          borderColor: "grey.200",
          zIndex: zIndex.appBar,
        };
      }}
    >
      {stepper ? (
        <Box
          sx={(theme) => ({
            width: "100%",
            maxWidth: "100%",
            flexShrink: 0,
            alignSelf: "stretch",
            overflow: "hidden",
            boxSizing: "border-box",
            px: 0,
            py: 0,
            borderBottom: "1px solid",
            borderColor: "grey.200",
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          })}
        >
          {stepper}
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: isRTL ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 1.5, sm: 2 },
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 0.25,
        }}
      >
        {leftIcon ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Icon
              sx={{
                fontSize: 24,
                color: disabled ? "grey.400" : "primary.main",
              }}
            >
              {leftIcon}
            </Icon>
            <MDTypography
              variant="body1"
              color={disabled ? "text.secondary" : "dark"}
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {summaryText}
            </MDTypography>
          </Box>
        ) : (
          <MDTypography
            variant="body1"
            fontWeight="bold"
            color="dark"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {summaryText}
          </MDTypography>
        )}
        <MDTypography
          variant={leftIcon ? "body2" : "h6"}
          fontWeight="bold"
          color="primary.main"
          sx={{
            fontSize: leftIcon
              ? { xs: "0.8rem", sm: "0.9rem" }
              : { xs: "1rem", sm: "1.25rem" },
          }}
        >
          {totalPriceText}
        </MDTypography>
      </Box>
      <MDButton
        type="button"
        variant="gradient"
        color="primary"
        disabled={disabled}
        onClick={onAction}
        sx={{
          borderRadius: 2,
          px: { xs: 2, sm: 3 },
          py: { xs: 1.25, sm: 1.5 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
          fontWeight: 600,
          flexShrink: 0,
          minWidth: { xs: 120, sm: 180 },
        }}
      >
        {actionLabel}
      </MDButton>
      </Box>
    </Box>
  );
}

CartFooterBar.propTypes = {
  summaryText: PropTypes.string.isRequired,
  totalPriceText: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.string,
  stepper: PropTypes.node,
};

export default CartFooterBar;
