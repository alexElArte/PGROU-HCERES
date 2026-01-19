import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {TailSpin} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import ReviewArticleAdd from "./ReviewArticleAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListReviewArticles} from "../../../services/Activity/review-article/ReviewArticleActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import ReviewArticleDelete from "./ReviewArticleDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les reviewArticles du database
function ReviewArticleList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [reviewArticleList, setReviewArticleList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetReviewArticle, setTargetReviewArticle] = React.useState(false);
    const [showReviewArticleAdd, setShowReviewArticleAdd] = React.useState(false);
    const [showReviewArticleDelete, setShowReviewArticleDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowReviewArticleAdd(false);
        setShowReviewArticleDelete(false);
        if (msg) {
            // an add or delete did occur
            // re render the table to load new data
            // note the list change count on dependencies table of use effect
            setListChangeCount(listChangeCount + 1)
        }
        displayResultMessage(msg);
    };

    const displayResultMessage = (messages = null) => {
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            setSuccessActivityAlert(messages.successMsg)
        }

        if (messages.errorMsg) {
            setErrorActivityAlert(messages.errorMsg)
        }
    }


    React.useEffect(() => {
        if (!targetResearcher) {
            // attention that method always change reference to variable not only its content
                    fetchListReviewArticles().then(list => setReviewArticleList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setReviewArticleList(list.filter(a => a.idTypeActivity === ActivityTypes.REVIEWING_JOURNAL_ARTICLES));
                })
    }, [listChangeCount, targetResearcher]);


    if (!reviewArticleList) {
        return <div className="d-flex align-items-center justify-content-center">
            <TailSpin stroke={"black"}/>
        </div>
    } else {
        if (reviewArticleList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucune revue d'article n'est enregistrée</h3>
                </div>
                <div className={"col-4"}>
                    {showReviewArticleAdd &&
                        <ReviewArticleAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowReviewArticleAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une reviewArticle
                    </button>
                </div>
            </div>;
        }
        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Supprimer l'activité
            </Tooltip>
        )
        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            formatter: (cell, row) => {
                return (<div>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 400}}
                        overlay={deleteTooltip}
                    >
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            setTargetReviewArticle(row)
                            setShowReviewArticleDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'reviewArticle.year',
            text: 'Année',
            sort: true,
        }, {
            dataField: 'reviewArticle.nbReviewedArticles',
            text: 'Nombre de revue d\'article',
            sort: true,
        }, {
            dataField: 'reviewArticle.impactFactor',
            text: 'Facteur d\'impact',
            sort: true,
        }, {
            dataField: 'reviewArticle.journal.journalName',
            text: 'Nom du journal',
            sort: true,
        }];

        let title = "ReviewArticle"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des reviewArticles pour les Chercheurs"
        }
        const CaptionElement = <div>
            <h3> {title}
            </h3>
        </div>

        const MyExportCSV = (props) => {
            const handleClick = () => {
                props.onExport();
            };
            return (
                <button className={"border-0"}
                        onClick={handleClick}>{
                    <GrDocumentCsv/>}
                </button>
            );
        };
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        };
        
        return (
            <div>
                <ToolkitProvider
                    bootstrap4
                    keyField="idActivity"
                    data={reviewArticleList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'reviewArticleList.csv',
                        onlyExportSelection: true,
                        exportAll: true
                    }}
                    search
                >
                    {
                        props => (
                            <div>
                                <br/>
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        <h3>{CaptionElement}</h3>
                                    </div>
                                    <div className={"col-4"}>
                                        {showReviewArticleAdd &&
                                            <ReviewArticleAdd targetResearcher={targetResearcher}
                                                              onHideAction={handleHideModal}/>}
                                        {showReviewArticleDelete &&
                                            <ReviewArticleDelete targetReviewArticle={targetReviewArticle}
                                                                 onHideAction={handleHideModal}/>}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <button className={"border-0 btn-lg"}
                                                onClick={(e) => setShowFilter(!showFilter)}>{
                                            <MdSearch/>}
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <h3>{<MyExportCSV  {...props.csvProps}/>}</h3>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-primary" data-bs-toggle="button"
                                                onClick={() => setShowReviewArticleAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une reviewArticle
                                        </button>
                                    </div>
                                </div>
                                 <div className={"row"}>
                                    <div className={"col-4"}>
                                        {showFilter && <SearchBar {...props.searchProps} />}
                                    </div>
                                    <div className={"col-8"}>
                                        {successActivityAlert && <Alert variant={"success"}
                                                                        onClose={() => setSuccessActivityAlert("")}
                                                                        dismissible={true}>{successActivityAlert}</Alert>}
                                        {errorActivityAlert && <Alert variant={"danger"}
                                                                      onClose={() => setErrorActivityAlert("")}
                                                                      dismissible={true}>{errorActivityAlert}</Alert>}
                                    </div>
                                </div>
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(reviewArticleList.length))}
                                    striped
                                    hover
                                    condensed
                                    selectRow={ selectRow }
                                    {...props.baseProps} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default ReviewArticleList;
