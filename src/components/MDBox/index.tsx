

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDBox
import MDBoxRoot from "components/MDBox/MDBoxRoot";
import { withOwnerState } from "types/muiDashboard";

const Root = withOwnerState(MDBoxRoot);

const MDBox = forwardRef<any, any>(
  ({ 
    variant = "contained", 
    bgColor = "transparent", 
    color = "dark", 
    opacity = 1, 
    borderRadius = "none", 
    shadow = "none", 
    coloredShadow = "none", 
    ...rest 
  }, ref) => (
    <Root
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

// Typechecking props for the MDBox
MDBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
};

export default MDBox;
