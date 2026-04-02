import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import {
  item,
  itemContent,
  itemArrow,
  itemIconBox,
  itemIcon,
} from "examples/Sidenav/styles/sidenavItem";
import { useMaterialUIController } from "context";

function SidenavItem({
  color = "info",
  name,
  icon,
  active = false,
  nested = false,
  children = false,
  open = false,
  ...rest
}) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  return (
    <>
      <ListItem
        {...rest}
        component="li"
        sx={(theme) =>
          item(theme, {
            active,
            color,
            miniSidenav,
            transparentSidenav,
            whiteSidenav,
            darkMode,
          })
        }
      >
        <MDBox
          sx={(theme) =>
            itemContent(theme, {
              active,
              miniSidenav,
              name,
              open,
              nested,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemIcon
            sx={(theme) => itemIconBox(theme, { active, miniSidenav })}
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>
          <ListItemText sx={{ margin: "0 5px" }} primary={name} />
          {children && (
            <Icon
              component="i"
              sx={(theme) =>
                itemArrow(theme, {
                  open,
                  miniSidenav,
                  transparentSidenav,
                  whiteSidenav,
                  darkMode,
                })
              }
            >
              expand_less
            </Icon>
          )}
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit {...rest}>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  name: PropTypes.string.isRequired,
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  nested: PropTypes.bool,
  children: PropTypes.node,
  open: PropTypes.bool,
};

export default SidenavItem;
