import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
} from "examples/Sidenav/styles/sidenavCollapse";

import { useMaterialUIController } from "context";

function SidenavCollapse({
  icon,
  name,
  children = false,
  active = false,
  noCollapse = false,
  open = false,
  ...rest
}) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  return (
    <>
      <ListItem component="li">
        <MDBox
          {...rest}
          sx={(theme) =>
            collapseItem(theme, {
              active,
              miniSidenav,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, {
                active,
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                darkMode,
              })
            }
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>
                {icon}
              </Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />

          {children && (
            <Icon
              sx={(theme) =>
                collapseArrow(theme, {
                  transparentSidenav,
                  whiteSidenav,
                  miniSidenav,
                  open,
                  active,
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
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
