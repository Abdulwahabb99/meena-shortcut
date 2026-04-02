

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDSocialButton
import MDSocialButtonRoot from "components/MDSocialButton/MDSocialButtonRoot";
import { withOwnerState } from "types/muiDashboard";

const Root = withOwnerState(MDSocialButtonRoot);

const MDSocialButton = forwardRef<any, any>(({ 
  color = "facebook", 
  size = "medium", 
  iconOnly = false, 
  circular = false, 
  children, 
  ...rest 
}, ref) => (
  <Root
    {...rest}
    ref={ref}
    variant="contained"
    color="primary"
    size={size}
    ownerState={{ color, size, iconOnly, circular }}
  >
    {children}
  </Root>
));

// Typechecking props for the MDSocialButton
MDSocialButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "pinterest",
    "youtube",
    "github",
    "vimeo",
    "slack",
    "dribbble",
    "reddit",
    "tumblr",
  ]),
  iconOnly: PropTypes.bool,
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDSocialButton;
