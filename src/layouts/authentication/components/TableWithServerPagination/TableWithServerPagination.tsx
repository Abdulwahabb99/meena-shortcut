import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDPagination from "components/MDPagination";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TableWithServerPagination({
  entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  showTotalEntries = true,
  table,
  isSorted = true,
  noEndBorder = false,
  isRTL = true,
  pageNumber,
  totalPages,
  handlePageChange,
  canNavigate = false,
  url = "",
}) {
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];

  const columns = useMemo(() => table?.columns ?? [], [table]);
  const data = useMemo(() => table?.rows ?? [], [table]);
  const navigate = useNavigate();
  const tableInstance = useTable(
    {
      columns: columns ?? [],
      data: data ?? [],
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer
      sx={{ boxShadow: "none", direction: "rtl" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Table sx={{ direction: "ltr" }} {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups?.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(
                    isSorted && column.getSortByToggleProps()
                  )}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);

            return (
              <TableRow
                key={key}
                {...row.getRowProps()}
                onClick={() =>
                  url ? navigate(`/${url}/${row?.original.id}`) : null
                }
                sx={{
                  cursor: url ? "pointer" : "default",
                  "&:hover": {
                    backgroundColor: url ? "#F7F7F9 !important" : "transparent",
                  },
                  "& td": {
                    transition: url ? "background-color 0.2s ease" : "none",
                  },
                }}
              >
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              {entriesStart} - {entriesEnd} of {rows.length}
            </MDTypography>
          </MDBox>
        )}

        {totalPages > 1 && (
          <Box
            sx={{
              direction: "ltr",
              display: "flex",
              justifyContent: "center",
              mt: "55px",
              mb: "15px",
            }}
          >
            <Pagination
              count={totalPages}
              page={pageNumber}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Typechecking props for the TableWithServerPagination
TableWithServerPagination.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default TableWithServerPagination;
