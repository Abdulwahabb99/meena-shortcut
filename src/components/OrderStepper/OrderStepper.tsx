import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useTranslate from "shared/hooks/useTranslate";

const STEP_COUNT = 3;

/**
 * Text-free progress bar: three segments fill with primary color as the user advances (activeStep 0–2).
 */
function OrderStepper({ activeStep, sx }) {
  const theme = useTheme();
  const { t } = useTranslate();
  const primary = theme.palette.primary.main;
  const track = theme.palette.grey[300];

  return (
    <Box
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={STEP_COUNT}
      aria-valuenow={Math.min(activeStep + 1, STEP_COUNT)}
      aria-label={t("orderFlow.progressAria")}
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        gap: 0,
        minHeight: 6,
        alignItems: "stretch",
        boxSizing: "border-box",
        ...sx,
      }}
    >
      {Array.from({ length: STEP_COUNT }, (_, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            minWidth: 0,
            height: 6,
            borderRadius: 0,
            bgcolor: index <= activeStep ? primary : track,
            transition: theme.transitions.create(["background-color"], {
              duration: theme.transitions.duration.shorter,
            }),
          }}
        />
      ))}
    </Box>
  );
}

OrderStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

OrderStepper.defaultProps = {
  sx: undefined,
};

export default OrderStepper;
