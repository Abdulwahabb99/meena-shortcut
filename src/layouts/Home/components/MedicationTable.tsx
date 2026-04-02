import { useMemo } from "react";
import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import QuantityControl from "./QuantityControl";
import PropTypes from "prop-types";

import { formatPriceNumber, formatPriceWithCurrency } from "utils/formatPrice";
import useLocales from "shared/hooks/useLocales";

function MedicationTable({
  medications,
  onUpdateQuantity,
  onRemove,
  emptyMessage,
  columns,
  isRTL,
}) {
  const { locale } = useLocales();
  const table = useMemo(() => {
    const cols = [
      {
        Header: columns.drugCode,
        accessor: "code",
        width: "15%",
        align: isRTL ? "right" : "left",
        Cell: ({ value }) => (
          <Box
            component="span"
            sx={{
              display: "inline-block",
              px: 1.5,
              py: 0.5,
              borderRadius: 10,
              bgcolor: "#F0E8FF",
              color: "primary.main",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {value}
          </Box>
        ),
      },
      {
        Header: columns.drugName,
        accessor: "name",
        width: "25%",
        align: isRTL ? "right" : "left",
        Cell: ({ value }) => (
          <MDTypography variant="body2" color="dark">
            {value}
          </MDTypography>
        ),
      },
      {
        Header: columns.quantity,
        accessor: "quantity",
        width: "15%",
        align: "center",
        Cell: ({ value, row }) => (
          <QuantityControl
            quantity={value}
            onIncrease={() => onUpdateQuantity(row.original._index, value + 1)}
            onDecrease={() =>
              onUpdateQuantity(row.original._index, Math.max(1, value - 1))
            }
          />
        ),
      },
      {
        Header: columns.price,
        accessor: "price",
        width: "15%",
        align: isRTL ? "left" : "right",
        Cell: ({ value }) => (
          <MDTypography variant="body2" color="dark" fontWeight={500}>
            {formatPriceNumber(value)}
          </MDTypography>
        ),
      },
      {
        Header: columns.subtotal,
        accessor: "subtotal",
        width: "15%",
        align: isRTL ? "left" : "right",
        Cell: ({ row }) => {
          const subtotal = (row.original.price || 0) * (row.original.quantity || 0);
          return (
            <MDTypography variant="body2" color="primary.main" fontWeight={600}>
              {formatPriceNumber(subtotal)}
            </MDTypography>
          );
        },
      },
      {
        Header: columns.actions,
        accessor: "actions",
        width: "10%",
        align: isRTL ? "left" : "right",
        Cell: ({ row }) => (
          <IconButton
            size="small"
            onClick={() => onRemove(row.original._index)}
            sx={{ color: "error.main" }}
            aria-label="delete"
          >
            <Icon fontSize="small">delete</Icon>
          </IconButton>
        ),
      },
    ];

    const rows = medications.map((m, index) => ({
      ...m,
      _index: index,
    }));

    return { columns: cols, rows };
  }, [medications, columns, onUpdateQuantity, onRemove, isRTL]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (medications.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <MDTypography variant="body1" color="text.secondary">
          {emptyMessage}
        </MDTypography>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {medications.map((m, index) => (
          <Box
            key={`${m.code}-${index}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: "#F0E8FF",
                  color: "primary.main",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  mb: 0.5,
                }}
              >
                {m.code}
              </Box>
              <MDTypography
                variant="body2"
                color="dark"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {m.name}
              </MDTypography>
              <MDTypography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                {m.quantity} × {formatPriceNumber(m.price)} = {formatPriceWithCurrency((m.price || 0) * m.quantity, locale)}
              </MDTypography>
            </Box>
            <QuantityControl
              quantity={m.quantity}
              onIncrease={() => onUpdateQuantity(index, m.quantity + 1)}
              onDecrease={() => onUpdateQuantity(index, Math.max(1, m.quantity - 1))}
              compact
            />
            <IconButton
              size="small"
              onClick={() => onRemove(index)}
              sx={{ color: "error.main", flexShrink: 0 }}
              aria-label="delete"
            >
              <Icon sx={{ fontSize: 20 }}>delete</Icon>
            </IconButton>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <DataTable
        table={table}
        canSearch={false}
        showTotalEntries={false}
        showPagination={false}
        entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
        isSorted={false}
        isRTL={isRTL}
        pagination={{ variant: "gradient", color: "info" }}
      />
    </Box>
  );
}

MedicationTable.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number,
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  columns: PropTypes.shape({
    drugCode: PropTypes.string.isRequired,
    drugName: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.string,
    subtotal: PropTypes.string,
    actions: PropTypes.string.isRequired,
  }).isRequired,
  isRTL: PropTypes.bool,
};

export default MedicationTable;
