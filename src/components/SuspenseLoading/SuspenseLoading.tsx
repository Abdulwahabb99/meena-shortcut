import { Box, CircularProgress } from "@mui/material";

function SuspenseLoading() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "#3C9D76" }} />
    </Box>
  );
}

export default SuspenseLoading;
