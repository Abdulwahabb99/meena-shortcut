

// Material Dashboard 3 PRO React base styles
import colors from "assets/theme-dark/base/colors";

// Material Dashboard 3 PRO React helper functions
import rgba from "assets/theme-dark/functions/rgba";

const { info: infoColor, white } = colors;
const gradientInfo = colors.gradients.info;

const flatpickr = {
  ".flatpickr-day:hover, .flatpickr-day:focus, .flatpickr-day.nextMonthDay:hover, .flatpickr-day.nextMonthDay:focus":
  {
    background: rgba(infoColor.main, 0.28),
    border: "none",
  },

  ".flatpickr-day.today": {
    background: infoColor.main,
    color: white.main,
    border: "none",

    "&:hover, &:focus": {
      background: `${infoColor.focus} !important`,
    },
  },

  ".flatpickr-day.selected, .flatpickr-day.selected:hover, .flatpickr-day.nextMonthDay.selected, .flatpickr-day.nextMonthDay.selected:hover, .flatpickr-day.nextMonthDay.selected:focus":
  {
    background: `${gradientInfo.state} !important`,
    color: white.main,
    border: "none",
  },

  ".flatpickr-months .flatpickr-next-month:hover svg, .flatpickr-months .flatpickr-prev-month:hover svg":
  {
    color: `${infoColor.main} !important`,
    fill: `${infoColor.main} !important`,
  },
};

export default flatpickr;
