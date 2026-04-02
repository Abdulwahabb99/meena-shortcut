function collapseItem(theme, ownerState) {
  const { transitions, breakpoints, functions, palette, direction } = theme;
  const { active, miniSidenav } = ownerState;
  const { meena } = palette;
  const { pxToRem } = functions;
  const isRTL = direction === "rtl";

  return {
    flexDirection: isRTL ? "row-reverse" : "row",
    background: active ? (meena?.activeBg || "rgba(140, 86, 255, 0.12)") : "transparent",
    color: active ? (meena?.secondary || "#6B47F5") : (meena?.tertiary || "#AF98DB"),
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
    marginBlock: pxToRem(2),
    marginInline: pxToRem(10),
    borderRadius: pxToRem(12),
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: "none",
    ...(active && !miniSidenav && {
      borderInlineStart: `3px solid ${meena?.icon || "#831ED2"}`,
      paddingInlineStart: pxToRem(11),
    }),

    [breakpoints.up("xl")]: {
      transition: transitions.create(
        ["box-shadow", "background-color", "border", "padding"],
        {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.shorter,
        }
      ),
    },

    "&:hover, &:focus": {
      backgroundColor: active
        ? (meena?.activeBg || "rgba(140, 86, 255, 0.15)")
        : (meena?.hoverBg || "rgba(140, 86, 255, 0.06)"),
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { transitions, functions, palette } = theme;
  const { pxToRem } = functions;
  const { active, miniSidenav } = ownerState;
  const iconColor = palette?.meena?.icon || "#831ED2";
  const hideIconWhenActive = active && !miniSidenav;

  return {
    minWidth: hideIconWhenActive ? 0 : pxToRem(20),
    minHeight: pxToRem(20),
    width: hideIconWhenActive ? 0 : "auto",
    padding: hideIconWhenActive ? 0 : undefined,
    overflow: "hidden",
    color: active ? iconColor : "inherit",
    borderRadius: pxToRem(8),
    display: "grid",
    placeItems: "center",
    transition: transitions.create(
      ["margin", "min-width", "width", "padding", "opacity"],
      {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }
    ),
    opacity: hideIconWhenActive ? 0 : 1,
    visibility: hideIconWhenActive ? "hidden" : "visible",

    "& .material-icons, & .MuiSvgIcon-root, & svg, & svg g": {
      color: active ? iconColor : "inherit",
      fontSize: "20px !important",
    },
  };
}

const collapseIcon = (theme, { active }) => ({
  color: active ? (theme.palette?.meena?.icon || "#831ED2") : "inherit",
  fontSize: "20px !important",
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions, palette, direction } = theme;
  const { miniSidenav, transparentSidenav, active } = ownerState;
  const { meena } = palette;
  const isRTL = direction === "rtl";
  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    flex: 1,
    marginInlineStart: isRTL ? 0 : pxToRem(10),
    marginInlineEnd: isRTL ? pxToRem(10) : 0,
    textAlign: isRTL ? "right" : "left",

    [breakpoints.up("xl")]: {
      opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
      maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
      marginInlineStart:
        miniSidenav || (miniSidenav && transparentSidenav) ? 0 : (isRTL ? 0 : pxToRem(10)),
      marginInlineEnd:
        miniSidenav || (miniSidenav && transparentSidenav) ? 0 : (isRTL ? pxToRem(10) : 0),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
      color: active ? (meena?.secondary || "#6B47F5") : (meena?.tertiary || "#AF98DB"),
    },
  };
}

function collapseArrow(theme, ownerState) {
  const { typography, transitions, breakpoints, functions, palette } = theme;
  const { transparentSidenav, miniSidenav, open, active } = ownerState;
  const { meena } = palette;
  const { size } = typography;
  const { pxToRem } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? "rotate(0)" : "rotate(-180deg)",
    color: open || active ? (meena?.primary || "#8C56FF") : (meena?.tertiary || "#AF98DB"),
    transition: transitions.create(["color", "transform", "opacity"], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      display: (transparentSidenav && miniSidenav) || miniSidenav ? "none !important" : "block !important",
    },
  };
}

export {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
};
