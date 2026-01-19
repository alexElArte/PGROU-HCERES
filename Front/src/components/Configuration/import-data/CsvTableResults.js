import React, {useState, useMemo} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {paginationOptions} from "../../util/BootStrapTableOptions";

export default function CsvTableResults({csvResultsData, csvResultsMetaFields}) {
    const [searchTerm, setSearchTerm] = useState('');

    const headers = csvResultsMetaFields || [];
    const data = useMemo(()=> {
        return csvResultsData || [];
    }, [csvResultsData]);

    const columns = headers.map((header, index) => (
        {dataField: header, text: header}
    ));
    columns.unshift({dataField: 'row', text: '#Row', sort: true});

    const originalData = useMemo(() => {
        return data.map((row, index) => ({...row, row: index + 1}));
    }, [data]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return originalData;
        return originalData.filter((row, index) => (row.row).toString().includes(searchTerm));
    }, [originalData, searchTerm]);

    return (
        <div>
            <div className="d-flex justify-content-center">
                <input
                    type="number"
                    min={1}
                    className="form-control"
                    placeholder={`Search in row number`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <BootstrapTable
                bootstrap4={true}
                keyField='row'
                data={filteredData}
                columns={columns}
                pagination={paginationFactory(paginationOptions(filteredData.length))}
                wrapperClasses="table-responsive"
                noDataIndication='No data to display'
            />
        </div>
    );
}
