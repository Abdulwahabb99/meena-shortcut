

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 3 PRO React context
import { useMaterialUIController, setLayout } from "context";
import useLocales from "shared/hooks/useLocales";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();
  const { isRTL } = useLocales();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname, dispatch]);

  const sidenavMargin = miniSidenav ? 73 : 240;

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",
        overflow: "visible",

        [breakpoints.up("xl")]: {
          ...(isRTL
            ? { marginRight: pxToRem(sidenavMargin) }
            : { marginLeft: pxToRem(sidenavMargin) }),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
