import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }: any) => {
  const { transitions, breakpoints, functions, palette } = theme;
  const { miniSidenav, isRTL = false } = ownerState;
  const { meena } = palette;

  const sidebarWidth = 240;
  const { pxToRem } = functions;

  const drawerOpenStyles = () => ({
    background: meena?.sidenavBg || "#F3EEFF",
    transform: "translateX(0)",
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),
    ...(isRTL ? { right: "0", left: "auto" } : { left: "0" }),
    width: sidebarWidth,

    [breakpoints.up("xl")]: {
      boxShadow: "none",
      width: sidebarWidth,
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  const drawerCloseStyles = () => ({
    background: meena?.sidenavBg || "#F3EEFF",
    transform: isRTL
      ? `translateX(${pxToRem(320)})`
      : `translateX(${pxToRem(-320)})`,
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),
    ...(isRTL ? { right: "0", left: "auto" } : { left: "0" }),
    width: sidebarWidth,

    [breakpoints.up("xl")]: {
      boxShadow: "none",
      width: pxToRem(73),
      overflowX: "hidden",
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),
    },
  });

  const aboveChrome = theme.zIndex.drawer + 50;

  return {
    zIndex: aboveChrome,
    "& .MuiDrawer-paper": {
      zIndex: `${aboveChrome} !important`,
      boxShadow: "none",
      border: "none",
      height: "100vh",
      top: 0,
      bottom: 0,
      margin: 0,
      borderRadius: 0,
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
