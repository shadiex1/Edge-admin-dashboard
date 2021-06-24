import React from 'react'
import styles from "./OrdersTable.module.scss"
import { useTable,usePagination, useSortBy,useFilters,useGroupBy, useGlobalFilter,useRowSelect ,useAsyncDebounce,useExpanded } from 'react-table'
import {matchSorter} from 'match-sorter'
import { Link} from "react-router-dom"
 


const OrdersTable =(props)=> {
  
  
 const makeData=(...lens)=> {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return props.orders.map(order => {
        return {
          ...order,
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
      })
    }
  
    return makeDataLevel()
  }
  














  ////testing filtera 
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  
  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  // This is a custom filter UI that uses a
  // slider to set the filter value between a column's
  // min and max values
  function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the min and max
    // using the preFilteredRows
  
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <>
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue || min}
          onChange={e => {
            setFilter(parseInt(e.target.value, 10))
          }}
        />
        <button onClick={() => setFilter(undefined)}>Off</button>
      </>
    )
  }
  
  // This is a custom UI for our 'between' or number range
  // filter. It uses two number boxes and filters rows to
  // ones that have values between the two
  function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          value={filterValue[0] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        to
        <input
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
  }
  
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val





  
// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
function Table({ columns, data, renderRowSubComponent }) {
    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true
          })
        },
      }),
      []
    )
  
    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    )
  
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
        sortBy,
        groupBy,
        expanded,
        filters,
        selectedRowIds,
        globalFilter
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
        disableMultiSort:true
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      useGroupBy,  
  useSortBy,

          useExpanded,

      usePagination,   
         useRowSelect,

    useRowSelect,
    // hooks => {
    //     hooks.visibleColumns.push(columns => {
    //       return [
    //         {
    //           id: 'selection',
    //           // Make this column a groupByBoundary. This ensures that groupBy columns
    //           // are placed after it
    //           groupByBoundary: true,
    //           // The header can use the table's getToggleAllRowsSelectedProps method
    //           // to render a checkbox
    //           Header: ({ getToggleAllRowsSelectedProps }) => (
    //             <div>
    //               <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //             </div>
    //           ),
    //           // The cell can use the individual row's getToggleRowSelectedProps method
    //           // to the render a checkbox
    //           Cell: ({ row }) => (
    //             <div>
    //               <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //             </div>
    //           ),
    //         },
    //         ...columns,
    //       ]
    //     })
    //   }
    )
  
    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    // const firstPageRows = rows.slice(0, 10)
  

  return (
    <>
      
      <table {...getTableProps()}>
      <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                 <th {...column.getHeaderProps()}>
                 <div>
                   {column.canGroupBy ? (
                    //  If the column can be grouped, let's add a toggle
                     <span {...column.getGroupByToggleProps()}>
                       {column.isGrouped ? '🛑 ' : '👊 '}
                     </span>
                   ) : null}
                   {/* {console.log(column.getGroupByToggleProps())} */}
                   <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                   {/* {console.log(column)} */}
                 </div>
                 {/* Render the columns filter UI */}
                 <div>{column.canFilter ? column.render('Filter') : null}</div>
               </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
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
            prepareRow(row)
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment >
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => { 
                    return (
                        <td {...cell.getCellProps()}>
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <span {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? '👇' : '👉'}
                            </span>{' '}
                            {cell.render('Cell', { editable: false })} (
                            {row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          cell.render('Cell', { editable: true })
                        )}
                      </td>                                  

                    )
                  })}
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {/* {renderRowSubComponent({ row })} */}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      <br />
      <div className={styles.paginationContainer}> <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div></div>
     
      {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
    </>
  )
}
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }
  filterGreaterThan.autoRemove = val => typeof val !== 'number'
// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
// function roundedMedian(leafValues) {
//     let min = leafValues[0] || 0
//     let max = leafValues[0] || 0
  
//     leafValues.forEach(value => {
//       min = Math.min(min, value)
//       max = Math.max(max, value)
//     })
  
//     return Math.round((min + max) / 2)
//   }
  
  // const IndeterminateCheckbox = React.forwardRef(
  //   ({ indeterminate, ...rest }, ref) => {
  //     const defaultRef = React.useRef()
  //     const resolvedRef = ref || defaultRef
  
  //     React.useEffect(() => {
  //       resolvedRef.current.indeterminate = indeterminate
  //     }, [resolvedRef, indeterminate])
  
  //     return (
  //       <>
  //         <input type="checkbox" ref={resolvedRef} {...rest} />
  //       </>
  //     )
  //   }
  // )
  const columns = React.useMemo(
    () => [
    //   {
    //     // Make an expander cell
    //     Header: () => null, // No header
    //     id: 'expander', // It needs an ID
    //     Cell: ({ row }) => (
    //       // Use Cell to render an expander for each row.
    //       // We can use the getToggleRowExpandedProps prop-getter
    //       // to build the expander.
    //       <span {...row.getToggleRowExpandedProps()}>
    //         details
    //       </span>
    //     ),
    //   },
      {
        Header: '#',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
        //   /////////////////////////////////// ast5dm al fuzzy text dah
        //   {
        //     Header: 'Last Name',
        //     accessor: 'lastName',
        //     // Use our custom `fuzzyText` filter on this column
        //     filter: 'fuzzyText',
        //   },
        ],
        
      },
      {
          Header:"Date",
          columns:[{
              Header:"Date",
              accessor:"date"
          }]
      },
      {
        Header: 'Price',
        columns: [
          {
            Header: 'Product price',
            accessor: 'productprice',
            Filter: NumberRangeColumnFilter,
            filter: 'between',
          },
          {
            Header: 'Shipment price',
            accessor: 'shipmentPrice',
            Filter: NumberRangeColumnFilter,
            filter: 'between',
            
          },
          {
            Header: 'Total price',
            accessor: 'totalPrice',
            Filter: NumberRangeColumnFilter,
            filter: 'between',
          }
        ],
      },{
          Header:"Status",
          columns:[
              {Header:"Shipment",
            accessor:"shipmentStatus",
        Filter:SelectColumnFilter,
    filter:"includes"}
            ,
              {Header:"Payment",
            accessor:"paymentMethod", Filter: SelectColumnFilter,
            filter: 'includes',}
          ]

      },
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          
        //  row.original? <Link  to={process.env.PUBLIC_URL+`/Orders/SingleOrder/${row.original && row.original.id}`} >
         row.original? <Link  to={process.env.PUBLIC_URL+`/Orders/SingleOrder/${row.original && row.original.id}`} >


          <span  >
            details
          </span>
          </Link>:null

        ),
      }
    ],
    []
  )

  const data = React.useMemo(() => makeData(10), [])

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  )

  return (
    <div className={styles.OrdersTable}>
      <Table
        columns={columns}
        data={data}
        // We added this as a prop for our table component
        // Remember, this is not part of the React Table API,
        // it's merely a rendering option we created for
        // ourselves
        // renderRowSubComponent={renderRowSubComponent}
      />

    </div>
  )
}

export default OrdersTable ;
