import React, {useMemo} from 'react';
import {ListGroup} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {paginationOptions} from "../../util/BootStrapTableOptions";
import getRandomBackgroundColor from "../../util/ColorGenerator";



export default function ImportCsvDuplicates({csvResultsData, csvResultsMetaFields, duplicateLines}) {
    const data = useMemo(() => {
        const csvFilteredData = [];
        let lineGroup = csvResultsData.length;
        duplicateLines.forEach(lineList => {
            lineGroup++;
            lineList.forEach(line => {
                const filteredLine = csvResultsData[line - 1];
                filteredLine.row = line;
                filteredLine.group = lineGroup;
                csvFilteredData.push(filteredLine);
            });
        });
        return csvFilteredData;
    }, [csvResultsData, duplicateLines]);

    const headers = useMemo(() => {
        // make a copy meta fields
        return [...csvResultsMetaFields];
    }, [csvResultsMetaFields]);

    const columns = headers.map((header, index) => (
        {
            dataField: header,
            text: header
        }
    ));
    columns.unshift({
        dataField: 'row',
        text: 'Ligne',
        style: (cell, row, rowIndex, colIndex) => {
            return row.group ? getRandomBackgroundColor(row.group) : {};
        }
    });

    return (
        <>
            <ListGroup.Item variant={"warning"}>
                <h4 className="card-title">Lignes dupliquées trouvées: </h4>
            </ListGroup.Item>
            <BootstrapTable
                bootstrap4={true}
                keyField='row'
                data={data}
                striped={true}
                columns={columns}
                pagination={paginationFactory(paginationOptions(data.length))}
                wrapperClasses="table-responsive"
                noDataIndication='No data to display'
            />
        </>
    );
}