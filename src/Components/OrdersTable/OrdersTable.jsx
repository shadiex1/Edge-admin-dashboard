import React from "react";
import styles from "./OrdersTable.module.scss";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  useRowSelect,
  useAsyncDebounce,
  useExpanded,
} from "react-table";
import { matchSorter } from "match-sorter";
import { Link } from "react-router-dom";

const OrdersTable = (props) => {
  const makeData = (...lens) => {
    const makeDataLevel = (depth = 0) => {
      return props.orders.map((order) => {
        return {
          ...order,
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        };
      });
    };

    return makeDataLevel();
  };

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0",
          }}
        />
      </span>
    );
  }

  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  // This is a custom UI for our 'between' or number range
  // filter. It uses two number boxes and filters rows to
  // ones that have values between the two
  function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
      preFilteredRows.forEach((row) => {
        min = Math.min(row.values[id], min);
        max = Math.max(row.values[id], max);
      });
      return [min, max];
    }, [id, preFilteredRows]);

    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          value={filterValue[0] || ""}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              val ? parseInt(val, 10) : undefined,
              old[1],
            ]);
          }}
          placeholder={`Min (${min})`}
          style={{
            width: "70px",
            marginRight: "0.5rem",
          }}
        />
        to
        <input
          value={filterValue[1] || ""}
          type="number"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              old[0],
              val ? parseInt(val, 10) : undefined,
            ]);
          }}
          placeholder={`Max (${max})`}
          style={{
            width: "70px",
            marginLeft: "0.5rem",
          }}
        />
      </div>
    );
  }

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  function Table({ columns, data }) {
    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        },
      }),
      []
    );

    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      prepareRow,
      state: {
        pageIndex,
        pageSize,
        // sortBy,
        // groupBy,
        // expanded,
        // filters,
        // selectedRowIds,
        globalFilter,
      },
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
        disableMultiSort: true,
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      useGroupBy,
      useSortBy,

      useExpanded,

      usePagination,
      useRowSelect,

      useRowSelect
    );

    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div>
                      {column.canGroupBy ? (
                        //  If the column can be grouped, let's add a toggle
                        <span {...column.getGroupByToggleProps()}>
                          {column.isGrouped ? "🛑 " : "👊 "}
                        </span>
                      ) : null}
                      <span {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                      {/* {console.log(column)} */}
                    </div>
                    {/* Render the columns filter UI */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <React.Fragment>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.isGrouped ? (
                            <>
                              <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? "👇" : "👉"}
                              </span>{" "}
                              {cell.render("Cell", { editable: false })} (
                              {row.subRows.length})
                            </>
                          ) : cell.isAggregated ? (
                            cell.render("Aggregated")
                          ) : cell.isPlaceholder ? null : (
                            cell.render("Cell", { editable: true })
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <br />
        <div className={styles.paginationContainer}>
          {" "}
          <div className={styles.pagination}>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }
  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue >= filterValue;
    });
  }
  filterGreaterThan.autoRemove = (val) => typeof val !== "number";

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        columns: [
          {
            Header: "Date",
            accessor: "formatedDate",
          },
        ],
      },
      {
        Header: "Price",
        columns: [
          {
            Header: "Product price",
            accessor: "productsPrice",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
          {
            Header: "Shipment price",
            accessor: "shippmentPrice",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
          {
            Header: "Total price",
            accessor: "totalPrice",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
        ],
      },
      {
        Header: "Status",
        columns: [
          {
            Header: "Shipment",
            accessor: "shippmentState",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
        ],
      },
      {
        Header: "Governorate",
        columns: [
          {
            Header: "Governorate",
            accessor: "governorate",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
        ],
      },
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID

        Cell: ({ row }) =>
          row.original ? (
            <Link
              className={styles.details}
              to={{
                pathname:
                  process.env.PUBLIC_URL +
                  `/Orders/SingleOrder/${row.original && row.original.ID}`,
                state: {
                  ID: row.original.ID,
                  productsDetails: row.original.productsDetails,
                  shippmentDetails: row.original.shippmentDetails,
                  shippmentState: row.original.shippmentState,
                },
              }}
            >
              <span>details</span>
            </Link>
          ) : null,
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(10), []);

  return (
    <div className={styles.OrdersTable}>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default OrdersTable;
