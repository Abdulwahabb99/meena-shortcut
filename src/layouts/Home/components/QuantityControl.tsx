import { Box, IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function QuantityControl({ quantity, onIncrease, onDecrease, min = 1, compact = false }) {
  const canDecrease = quantity > min;
  const size = compact ? 28 : 32;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 0.25 : 0.5,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={!canDecrease}
        sx={{
          width: size,
          height: size,
          bgcolor: "grey.200",
          "&:hover": { bgcolor: "grey.300" },
          "&.Mui-disabled": { bgcolor: "grey.100", color: "grey.400" },
        }}
      >
        −
      </IconButton>
      <MDTypography
        variant="button"
        fontWeight="bold"
        sx={{
          minWidth: compact ? 20 : 24,
          textAlign: "center",
          fontSize: compact ? "0.8rem" : "inherit",
        }}
      >
        {quantity}
      </MDTypography>
      <IconButton
        size="small"
        onClick={onIncrease}
        sx={{
          width: size,
          height: size,
          bgcolor: "grey.200",
          "&:hover": { bgcolor: "grey.300" },
        }}
      >
        +
      </IconButton>
    </Box>
  );
}

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  min: PropTypes.number,
  compact: PropTypes.bool,
};

export default QuantityControl;
