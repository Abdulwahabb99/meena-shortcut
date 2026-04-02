import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import PropTypes from "prop-types";
import { formatPriceNumber, formatPriceWithCurrency } from "utils/formatPrice";

/**
 * Read-only medication list: mobile cards + desktop table.
 * Uses home.* translation keys for column labels.
 */
function MedicationOrderList({ medications, maxHeight = 400 }) {
  const { t } = useTranslate();
  const { isRTL, locale } = useLocales();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MDBox sx={{ maxHeight, overflowY: "auto" }}>
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 1.5,
          }}
        >
          {medications.map((m, index) => (
            <Box
              key={`${m.code}-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                <MDTypography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.25 }}
                >
                  {m.quantity} × {formatPriceNumber(m.price)} ={" "}
                  {formatPriceWithCurrency((m.price || 0) * m.quantity, locale)}
                </MDTypography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <MDBox sx={{ overflowX: "auto" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& th, & td": {
                py: 2,
                px: 3,
                borderBottom: "1px solid",
                borderColor: "grey.200",
                textAlign: isRTL ? "right" : "left",
              },
              "& th": {
                fontWeight: 600,
                color: "text.secondary",
                fontSize: "0.75rem",
                textTransform: "uppercase",
              },
            }}
          >
            <thead>
              <tr>
                <th>{t("home.drugCode")}</th>
                <th>{t("home.drugName")}</th>
                <th style={{ textAlign: "center" }}>{t("home.quantity")}</th>
                <th style={{ textAlign: isRTL ? "left" : "right" }}>
                  {t("home.price")}
                </th>
                <th style={{ textAlign: isRTL ? "left" : "right" }}>
                  {t("home.subtotal")}
                </th>
              </tr>
            </thead>
            <tbody>
              {medications.map((m, index) => (
                <tr key={`${m.code}-${index}`}>
                  <td>
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
                      {m.code}
                    </Box>
                  </td>
                  <td>
                    <MDTypography variant="body2" color="dark">
                      {m.name}
                    </MDTypography>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <MDTypography variant="body2" fontWeight="bold" color="dark">
                      {m.quantity}
                    </MDTypography>
                  </td>
                  <td style={{ textAlign: isRTL ? "left" : "right" }}>
                    <MDTypography variant="body2" color="dark">
                      {formatPriceNumber(m.price)}
                    </MDTypography>
                  </td>
                  <td style={{ textAlign: isRTL ? "left" : "right" }}>
                    <MDTypography
                      variant="body2"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {formatPriceNumber((m.price || 0) * m.quantity)}
                    </MDTypography>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </MDBox>
      )}
    </MDBox>
  );
}

MedicationOrderList.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number,
    })
  ).isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MedicationOrderList;
