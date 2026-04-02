import PropTypes from "prop-types";
import { Box, useTheme } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/** Default animation from LottieFiles (dotlottie hosted URL). */
export const DEFAULT_SIGN_IN_LOTTIE_SRC =
  "https://lottie.host/5221fc84-ee03-44e1-baeb-f9aea40acee3/Hi91VyL4G5.lottie";

/**
 * Sign-in hero: square size steps by breakpoint (like CSS min-width media queries).
 */
const DEFAULT_SIZES = { lg: 400, xl: 520, xxl: 640 };

function SignInHeroLottie({
  src,
  loop,
  autoplay,
  sx,
  sizes,
}) {
  const theme = useTheme();
  const { lg: sizeLg, xl: sizeXl, xxl: sizeXxl } = {
    ...DEFAULT_SIZES,
    ...sizes,
  };

  return (
    <Box
      sx={{
        position: "relative",
        flexShrink: 0,
        mx: "auto",
        overflow: "hidden",
        // default / من أول lg (اللوحة أصلاً مخفية تحته)
        width: sizeLg,
        height: sizeLg,
        maxWidth: "100%",
        [theme.breakpoints.up("xl")]: {
          width: sizeXl,
          height: sizeXl,
        },
        [theme.breakpoints.up(1920)]: {
          width: sizeXxl,
          height: sizeXxl,
        },
        ...sx,
      }}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        layout={{ fit: "contain", align: [0.5, 0.5] }}
        renderConfig={{ autoResize: true }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </Box>
  );
}

SignInHeroLottie.propTypes = {
  src: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  sx: PropTypes.object,
  sizes: PropTypes.shape({
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
};

SignInHeroLottie.defaultProps = {
  src: DEFAULT_SIGN_IN_LOTTIE_SRC,
  loop: true,
  autoplay: true,
  sx: undefined,
  sizes: undefined,
};

export default SignInHeroLottie;
