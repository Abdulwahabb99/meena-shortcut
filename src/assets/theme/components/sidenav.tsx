

// Material Dashboard 3 PRO React base styles
import colors from "assets/theme/base/colors";

// Material Dashboard 3 PRO React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { white } = colors;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(222),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(222),
      backgroundColor: white.main,
      height: "100vh",
      margin: 0,
      top: 0,
      borderRadius: 0,
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
