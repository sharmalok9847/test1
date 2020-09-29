import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable, { createTheme } from 'react-data-table-component';

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;



const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
  </>
);

var columns = [];

const ReactComponentTable = (props, prevProps) => {
  const [values, setValues] = React.useState([]);
  const [filterText, setFilterText] = React.useState('');

  useEffect( () => {  
      var local_columns = []
      props.columns.map((columns) => {
        local_columns.push({name: '' + columns, selector: '' + columns, sortable: true,})
      });
      columns = local_columns
      setValues(props.values)
  },[]);


  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = values.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  if(columns.length != 0){    
    return (
      <DataTable
        title="Contact List"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
      />
    );
  }else{
    return(
      <div></div>
    )
  }
};

export default ReactComponentTable

