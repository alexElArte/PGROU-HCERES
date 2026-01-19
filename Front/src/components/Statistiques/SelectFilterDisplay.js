import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import getRandomBackgroundColor from "../util/ColorGenerator";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";

export default React.memo(function SelectFilterDisplay({selectOptions, onChange}) {
    const [selectedRows, setSelectedRows] = React.useState([]);

    const optionsKeyMap = React.useMemo(() => {
        // select all rows by default
        return selectOptions.reduce((map, obj) => {
            map[obj.key] = obj.value;
            return map;
        }, {});
    }, [selectOptions]);

    const handleSelectedRowsChange = React.useCallback((newSelectedRows) => {
        const newSelectedValues = newSelectedRows.map((key) => optionsKeyMap[key]);
        onChange(newSelectedValues);
        setSelectedRows(newSelectedRows);
    }, [optionsKeyMap, onChange]);

    const columns = [
        {
            dataField: 'key',
            text: 'key',
            hidden: true,
        },
        {
            dataField: 'label',
            text: 'label',
            filter: optionsKeyMap?.length > 5 ? textFilter(): null,
        },
        {
            dataField: 'value',
            text: 'value',
            hidden: true,
        },
    ];

    const data = selectOptions;
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        style: (row) => getRandomBackgroundColor(row.key),
        onSelect: (row, isSelect) => {
            if (isSelect) {
                handleSelectedRowsChange([...selectedRows, row.key]);
            } else {
                handleSelectedRowsChange(selectedRows.filter((key) => key !== row.key));
            }
        },
        onSelectAll: (isSelect, rows) => {
            if (isSelect) {
                handleSelectedRowsChange(rows.map((row) => row.key));
            } else {
                handleSelectedRowsChange([]);
            }
        },
        selected: selectedRows,
    };

    return (
        <div>
            <BootstrapTable
                bootstrap4={true}
                keyField='key'
                data={data}
                columns={columns}
                selectRow={selectRow}
                filter={filterFactory()}
            />
        </div>
    );
});