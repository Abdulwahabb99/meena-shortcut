import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useLocales from "shared/hooks/useLocales";
import { LOCALES } from "i18n/config";

function AuthLanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { locale, changeLocale, allLangs, isRTL } = useLocales();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (code) => {
    changeLocale(code);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: "text.secondary",
          "&:hover": { color: "text.primary", bgcolor: "action.hover" },
        }}
        aria-label="Change language"
      >
        <Icon>language</Icon>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isRTL ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isRTL ? "left" : "right",
        }}
        PaperProps={{ sx: { mt: 0.5 } }}
      >
        {allLangs.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={locale === lang.code}
            onClick={() => handleSelect(lang.code)}
          >
            <ListItemIcon>
              <Icon fontSize="small">
                {lang.code === LOCALES.AR ? "translate" : "g_translate"}
              </Icon>
            </ListItemIcon>
            <ListItemText primary={lang.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default AuthLanguageSwitcher;
