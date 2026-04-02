import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import { withOwnerState } from "types/muiDashboard";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";

const Root = withOwnerState(SidenavRoot);

function Sidenav({ color = "info", brand = "", routes, ...rest }) {
  const theme = useTheme();
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const findParentKey = (routesList) => {
      for (const route of routesList) {
        if (route.collapse) {
          for (const child of route.collapse) {
            if (
              child.route === pathname ||
              (child.collapse &&
                child.collapse.some((n) => n.route === pathname))
            ) {
              return route.key;
            }
          }
        }
      }
      return false;
    };

    const parentKey = findParentKey(routes);
    setOpenCollapse(parentKey);
  }, [pathname, routes]);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth >= 1200 ? transparentSidenav : false
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth >= 1200 ? whiteSidenav : false
      );
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  const renderCollapse = (collapseItems, parentKey) =>
    collapseItems?.map(({ name, nameKey, key, route, href, icon, collapse }) => {
      const displayName = nameKey ? t(nameKey) : name;
      if (collapse) {
        return (
          <SidenavItem
            key={key}
            color={color}
            name={displayName}
            icon={icon}
            active={openCollapse === key}
            open={openCollapse === key}
            onClick={() =>
              openCollapse === key
                ? setOpenCollapse(false)
                : setOpenCollapse(key)
            }
          >
            {renderCollapse(collapse, key)}
          </SidenavItem>
        );
      }

      if (href) {
        return (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
          <SidenavItem
            color={color}
            name={displayName}
            icon={icon}
            active={pathname === route}
            nested
          />
          </Link>
        );
      }

      return (
        <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
          <SidenavItem
            color={color}
            name={displayName}
            icon={icon}
            active={pathname === route}
            nested
          />
        </NavLink>
      );
    });

  const renderRoutes = routes.map(
    ({
      type,
      name,
      nameKey,
      icon,
      title,
      noCollapse,
      key,
      href,
      route,
      collapse,
    }) => {
      const displayName = nameKey ? t(nameKey) : name;
      if (type === "title") {
        return (
          <MDTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{
              paddingInlineStart: 2,
              mt: 2,
              mb: 1,
              marginInlineStart: 1,
              color: theme.palette?.meena?.tertiary || "#AF98DB",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </MDTypography>
        );
      }

      if (type === "divider") {
        return (
          <Divider
            key={key}
            sx={{ borderColor: theme.palette?.meena?.border || "rgba(140, 86, 255, 0.1)", my: 1 }}
          />
        );
      }

      if (type === "collapse") {
        if (noCollapse && route) {
          return (
            <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
              <SidenavCollapse
                name={displayName}
                icon={icon}
                noCollapse
                active={pathname === route}
              />
            </NavLink>
          );
        }

        return (
          <SidenavCollapse
            key={key}
            name={displayName}
            icon={icon}
            active={openCollapse === key}
            open={openCollapse === key}
            onClick={() => setOpenCollapse(openCollapse === key ? false : key)}
          >
            {renderCollapse(collapse, key)}
          </SidenavCollapse>
        );
      }

      return null;
    }
  );

  return (
    <Root
      {...rest}
      variant="permanent"
      anchor={isRTL ? "right" : "left"}
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode, isRTL }}
    >
      <MDBox pt={3} pb={1} px={3} sx={{ textAlign: isRTL ? "right" : "left" }}>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ textDecoration: "none" }}
        >
          {brand && (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              sx={{
                width: "6rem",
                height: "4rem",
                minWidth: "6rem",
                minHeight: "4rem",
                objectFit: "contain",
                objectPosition: isRTL ? "right" : "left",
              }}
            />
          )}
        </MDBox>
      </MDBox>
      <List sx={{ px: 0.5 }}>{renderRoutes}</List>
    </Root>
  );
}

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
