import React from 'react';
import { withTranslation } from 'react-i18next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { dateFilter, numberFilter, textFilter } from 'react-bootstrap-table2-filter';
import { Alert, OverlayTrigger } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import { ThreeDots } from "react-loading-icons";
import { chercheursColumnOfActivity, paginationOptions } from "../../util/BootStrapTableOptions";
import { MdSearch } from "react-icons/md";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";

import ActivityTypes from "../../../const/ActivityTypes";
import { fetchListNetworks } from "../../../services/Activity/network/NetworkActions";
import { fetchResearcherActivities } from "../../../services/Researcher/ResearcherActions";
import NetworkDelete from "./NetworkDelete";
import NetworkAdd from "./NetworkAdd";
import Tooltip from "react-bootstrap/Tooltip";

function NetworkList(props) {
    const { t } = props;
    const targetResearcher = props.targetResearcher;

    const [networkList, setNetworkList] = React.useState(null);
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const { SearchBar } = Search;

    const [targetNetwork, setTargetNetwork] = React.useState(false);
    const [showNetworkAdd, setShowNetworkAdd] = React.useState(false);
    const [showNetworkDelete, setShowNetworkDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const handleHideModal = (msg = null) => {
        setShowNetworkAdd(false);
        setShowNetworkDelete(false);
        if (msg) setListChangeCount(listChangeCount + 1);
        displayResultMessage(msg);
    };

    const displayResultMessage = (messages = null) => {
        if (!messages) return;
        if (messages.successMsg) setSuccessActivityAlert(messages.successMsg);
        if (messages.errorMsg) setErrorActivityAlert(messages.errorMsg);
    };

    React.useEffect(() => {
        if (!targetResearcher) {
            fetchListNetworks().then(list => setNetworkList(list));
        } else {
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setNetworkList(list.filter(a => a.idTypeActivity === ActivityTypes.NETWORK));
                });
        }
    }, [listChangeCount, targetResearcher]);

    if (!networkList) {
        return <div className="d-flex align-items-center justify-content-center">
            <ThreeDots stroke={"black"} />
        </div>;
    } else {
        if (networkList.length === 0) {
            return <div className={"row"}>
                <br />
                <div className={"col-8"}>
                    <h3>{t('activity.network.no')}</h3>
                </div>
                <div className={"col-4"}>
                    {showNetworkAdd && <NetworkAdd targetResearcher={targetResearcher} onHideAction={handleHideModal} />}
                    <button className="btn btn-primary" data-bs-toggle="button"
                        onClick={() => setShowNetworkAdd(true)}>
                        <AiOutlinePlusCircle /> &nbsp; {t('activity.network.add')}
                    </button>
                </div>
            </div>;
        }

        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                {t('activity.delete')}
            </Tooltip>
        );

        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            formatter: (cell, row) => (
                <div>
                    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={deleteTooltip}>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            setTargetNetwork(row);
                            setShowNetworkDelete(true);
                        }}>
                            <AiFillDelete />
                        </button>
                    </OverlayTrigger>
                    &nbsp; &nbsp;
                    {row.idActivity}
                </div>
            )
        }, {
            dataField: 'network.nameNetwork',
            text: t('activity.network.nameNetwork'),
            sort: true,
            filter: showFilter ? textFilter() : null,
        }, {
            dataField: 'network.startDate',
            text: t('activity.network.startDate'),
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'network.activeNetwork',
            text: t('activity.network.activeNetwork'),
            sort: true,
        }, {
            dataField: 'network.associatedFunding',
            text: t('activity.network.associatedFunding'),
            sort: true,
            filter: showFilter ? textFilter() : null,
            hidden: true,
        }, {
            dataField: 'network.nbResultingPublications',
            text: t('activity.network.nbResultingPublications'),
            sort: true,
            filter: showFilter ? numberFilter() : null,
        }, {
            dataField: 'network.refResultingPublications',
            text: t('activity.network.refResultingPublications'),
            sort: true,
            filter: showFilter ? textFilter() : null,
            hidden: true,
        }, {
            dataField: 'network.umrCoordinated',
            text: t('activity.network.umrCoordinated'),
            sort: true,
            filter: showFilter ? textFilter() : null,
        }, {
            dataField: 'network.agreementSigned',
            text: t('activity.network.agreementSigned'),
            sort: true,
            filter: showFilter ? textFilter() : null,
            hidden: true,
        }];

        let title = t('activity.network.title');
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity);
            title = t('activity.network.list');
        }

        const CaptionElement = <div><h3>{title}</h3></div>;

        const MyExportCSV = (props) => (
            <button className={"border-0"} onClick={() => props.onExport()}>
                <GrDocumentCsv />
            </button>
        );

        const selectRow = { mode: 'checkbox', clickToSelect: true };

        return (
            <div>
                <ToolkitProvider
                    bootstrap4
                    keyField="idActivity"
                    data={networkList}
                    columns={columns}
                    exportCSV={{ fileName: 'networkList.csv', onlyExportSelection: true, exportAll: true }}
                    search
                >
                    {
                        props => (
                            <div>
                                <br />
                                <div className={"row"}>
                                    <div className={"col-8"}>{CaptionElement}</div>
                                    <div className={"col-4"}>
                                        {showNetworkAdd && <NetworkAdd targetResearcher={targetResearcher} onHideAction={handleHideModal} />}
                                        {showNetworkDelete && <NetworkDelete targetNetwork={targetNetwork} onHideAction={handleHideModal} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <button className={"border-0 btn-lg"} onClick={() => setShowFilter(!showFilter)}>
                                            <MdSearch />
                                        </button>
                                    </div>
                                    <div className="col-4"><h3><MyExportCSV {...props.csvProps} /></h3></div>
                                    <div className="col-4">
                                        <button className="btn btn-primary" data-bs-toggle="button" onClick={() => setShowNetworkAdd(true)}>
                                            <AiOutlinePlusCircle /> &nbsp; {t('activity.network.add')}
                                        </button>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-4"}>
                                        {showFilter && <SearchBar {...props.searchProps} />}
                                    </div>
                                    <div className={"col-8"}>
                                        {successActivityAlert && <Alert variant={"success"} onClose={() => setSuccessActivityAlert("")} dismissible>{successActivityAlert}</Alert>}
                                        {errorActivityAlert && <Alert variant={"danger"} onClose={() => setErrorActivityAlert("")} dismissible>{errorActivityAlert}</Alert>}
                                    </div>
                                </div>
                                <hr />
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(networkList.length))}
                                    striped
                                    hover
                                    condensed
                                    selectRow={selectRow}
                                    {...props.baseProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default withTranslation()(NetworkList);
