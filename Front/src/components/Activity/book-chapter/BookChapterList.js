import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { dateFilter, numberFilter, textFilter } from 'react-bootstrap-table2-filter';
import { Alert, OverlayTrigger } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import { Audio } from "react-loading-icons";
import { chercheursColumnOfActivity, paginationOptions } from "../../util/BootStrapTableOptions";
import { MdSearch } from "react-icons/md";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";

import ActivityTypes from "../../../const/ActivityTypes";
import { fetchListBookChapter } from "../../../services/Activity/book-chapter/BookChapterActions";
import { fetchResearcherActivities } from "../../../services/Researcher/ResearcherActions";
import BookChapterDelete from "./BookChapterDelete";
import BookChapterAdd from "./BookChapterAdd";
import Tooltip from "react-bootstrap/Tooltip";

function BookChapterList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [bookChapterList, setBookChapterList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const { SearchBar } = Search;

    // Form state (List Template)
    const [targetBookChapter, setTargetBookChapter] = React.useState(false);
    const [showBookChapterAdd, setShowBookChapterAdd] = React.useState(false);
    const [showBookChapterDelete, setShowBookChapterDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const handleHideModal = (msg = null) => {
        setShowBookChapterAdd(false);
        setShowBookChapterDelete(false);
        if (msg) {
            setListChangeCount(listChangeCount + 1);
        }
        displayResultMessage(msg);
    };

    const displayResultMessage = (messages = null) => {
        if (!messages) return;
        if (messages.successMsg) setSuccessActivityAlert(messages.successMsg);
        if (messages.errorMsg) setErrorActivityAlert(messages.errorMsg);
    };

    React.useEffect(() => {
        if (!targetResearcher) {
            fetchListBookChapter().then(list => setBookChapterList(list));
        } else {
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setBookChapterList(list.filter(a => a.idTypeActivity === ActivityTypes.BOOK_CHAPTER));
                });
        }
    }, [listChangeCount, targetResearcher]);

        if (!bookChapterList) {
            return <div className="d-flex align-items-center justify-content-center">
                <Audio stroke={"black"} />
            </div>;
        } else {
            if (bookChapterList.length === 0) {
                return <div className={"row"}>
                    <br />
                    <div className={"col-8"}>
                        <h3>Aucune chapitre n'est enregistré</h3>
                    </div>
                    <div className={"col-4"}>
                        {showBookChapterAdd &&
                            <BookChapterAdd targetResearcher={targetResearcher} onHideAction={handleHideModal} />}
                        <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowBookChapterAdd(true)}>
                            <AiOutlinePlusCircle /> &nbsp; Ajouter une chapitre d'un livre
                        </button>
                    </div>
                </div>;
            }

        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Supprimer l'activité
            </Tooltip>
        );

        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            formatter: (cell, row) => {
                return (
                    <div>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={deleteTooltip}>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => {
                                setTargetBookChapter(row);
                                setShowBookChapterDelete(true);
                            }}>
                                <AiFillDelete />
                            </button>
                        </OverlayTrigger>
                        &nbsp;  &nbsp;
                        {row.idActivity}
                    </div>
                );
            }
        }, {
            dataField: 'bookChapter.chapterTitle',
            text: "Titre",
            sort: true,
            filter: showFilter ? textFilter() : null,
        }, {
            dataField: 'bookChapter.bookTitle',
            text: "Titre livre",
            sort: true,
            filter: showFilter ? textFilter() : null,
        }, {
            dataField: 'bookChapter.publicationDate',
            text: "Date de publication",
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'bookChapter.editor',
            text: "Éditeur",
            sort: true,
            filter: showFilter ? textFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'bookChapter.authors',
            text: "Auteur(s)",
            sort: true,
            filter: showFilter ? textFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'bookChapter.nbPage',
            text: "Nombre de pages",
            sort: true,
            filter: showFilter ? numberFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'bookChapter.additionalInfo',
            text: "Informations supplémentaires",
            sort: true,
            filter: showFilter ? numberFilter() : null,
        }, {
            dataField: 'bookChapter.language.languageName',
            text: "Langue",
            sort: true,
            filter: showFilter ? textFilter() : null,
        }];

        let title = "Chapitres de livres";
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity);
            title = "Liste des chapitres de livres pour les Chercheurs";
        }

        const CaptionElement = <div>
            <h3>{title}</h3>
        </div>;

        const MyExportCSV = (props) => {
            const handleClick = () => props.onExport();
            return (
                <button className={"border-0"} onClick={handleClick}>
                    <GrDocumentCsv />
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
                    data={bookChapterList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'bookChapterList.csv',
                        onlyExportSelection: true,
                        exportAll: true
                    }}
                    search
                >
                    {
                        props => (
                            <div>
                                <br />
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        {CaptionElement}
                                    </div>
                                    <div className={"col-4"}>
                                        {showBookChapterAdd &&
                                            <BookChapterAdd targetResearcher={targetResearcher}
                                                onHideAction={handleHideModal} />}
                                        {showBookChapterDelete &&
                                            <BookChapterDelete targetBookChapter={targetBookChapter}
                                                onHideAction={handleHideModal} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <button className={"border-0 btn-lg"}
                                            onClick={() => setShowFilter(!showFilter)}>
                                            <MdSearch />
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <h3><MyExportCSV {...props.csvProps} /></h3>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-primary" data-bs-toggle="button"
                                            onClick={() => setShowBookChapterAdd(true)}>
                                            <AiOutlinePlusCircle /> &nbsp; Ajouter un chapitre de livre
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
                                <hr />
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(bookChapterList.length))}
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

export default BookChapterList;
