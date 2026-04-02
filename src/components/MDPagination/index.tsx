

import { forwardRef, createContext, useContext, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";

// Custom styles for MDPagination
import MDPaginationItemRoot from "components/MDPagination/MDPaginationItemRoot";
import { withOwnerState } from "types/muiDashboard";

const ItemRoot = withOwnerState(MDPaginationItemRoot);

// The Pagination main context
const Context = createContext(null);

const MDPagination = forwardRef<any, any>(
  (
    {
      item = false,
      variant = "gradient",
      color = "info",
      size = "medium",
      active = false,
      children,
      ...rest
    },
    ref
  ) => {
    const context = useContext(Context);
    const paginationSize = context ? context.size : null;

    const value = useMemo(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <Context.Provider value={value}>
        {item ? (
          <ItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </ItemRoot>
        ) : (
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none", direction: "ltr" }}
          >
            {children}
          </MDBox>
        )}
      </Context.Provider>
    );
  }
);

// Typechecking props for the MDPagination
MDPagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(["gradient", "contained"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDPagination;
