import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
} from "context";
// import { useAuth } from "shared/hooks/useAuth";
// import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import LanguageSwitcher from "./LanguageSwitcher";

function DashboardNavbar({ absolute = false, light = false, isMini = false }) {
  // const { logout } = useAuth();
  // const { t } = useTranslate();
  const [navbarType, setNavbarType] = useState<"sticky" | "static">("static");
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    darkMode,
  } = controller;
  const { isRTL } = useLocales();
  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);
  // const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(null);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleCloseMenu = () => setOpenMenu(null);
  // const handleOpenSettingsMenu = (event) => {
  //   setSettingsAnchorEl(event.currentTarget);
  // };
  // const handleCloseSettingsMenu = () => {
  //   setSettingsAnchorEl(null);
  // };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<Icon>shopping_cart</Icon>}
        title="Payment successfully completed"
      />
    </Menu>
  );
  // const settingsMenu = () => (
  //   <Menu
  //     anchorEl={settingsAnchorEl}
  //     open={Boolean(settingsAnchorEl)}
  //     onClose={handleCloseSettingsMenu}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: isRTL ? "left" : "right",
  //     }}
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: isRTL ? "left" : "right",
  //     }}
  //     PaperProps={{ sx: { mt: 0.5 } }}
  //   >
  //     <NotificationItem
  //       onClick={() => logout()}
  //       icon={<Icon>logout</Icon>}
  //       title={t("common.signOut")}
  //     />
  //   </Menu>
  // );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode, isRTL })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" sx={(theme) => navbarRow(theme, { isMini })}>
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"} my={1}>
              {/* <Link to="/profile">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <LanguageSwitcher iconsStyle={iconsStyle} buttonSx={navbarIconButton} />
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenSettingsMenu}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              {settingsMenu()} */}
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <MDBadge badgeContent={9} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </MDBadge>
              </IconButton> */}
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
