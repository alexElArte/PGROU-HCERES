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
import { fetchListBooks } from "../../../services/Activity/book/BookActions";
import { fetchResearcherActivities } from "../../../services/Researcher/ResearcherActions";
import BookDelete from "./BookDelete";
import BookAdd from "./BookAdd";
import Tooltip from "react-bootstrap/Tooltip";

function BookList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [bookList, setBookList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const { SearchBar } = Search;

    // Form state (List Template)
    const [targetBook, setTargetBook] = React.useState(false);
    const [showBookAdd, setShowBookAdd] = React.useState(false);
    const [showBookDelete, setShowBookDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const handleHideModal = (msg = null) => {
        setShowBookAdd(false);
        setShowBookDelete(false);
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
            fetchListBooks().then(list => setBookList(list));
        } else {
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setBookList(list.filter(a => a.idTypeActivity === ActivityTypes.BOOK));
                });
        }
    }, [listChangeCount, targetResearcher]);

    if (!bookList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Audio stroke={"black"} />
        </div>;
    } else {
        if (bookList.length === 0) {
            return <div className={"row"}>
                <br />
                <div className={"col-8"}>
                    <h3>Aucun livre n'est enregistré</h3>
                </div>
                <div className={"col-4"}>
                    {showBookAdd &&
                        <BookAdd targetResearcher={targetResearcher} onHideAction={handleHideModal} />}
                    <button className="btn btn-primary" data-bs-toggle="button"
                        onClick={() => setShowBookAdd(true)}>
                        <AiOutlinePlusCircle /> &nbsp; Ajouter un livre
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
                                setTargetBook(row);
                                setShowBookDelete(true);
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
            dataField: 'book.title',
            text: "Titre",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Titre...'}) : null,
        }, {
            dataField: 'book.publicationDate',
            text: "Date de publication",
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'book.editor',
            text: "Éditeur",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Éditeur...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'book.authors',
            text: "Auteur(s)",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Auteur(s)...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'book.nbPage',
            text: "Nombre de pages",
            sort: true,
            filter: showFilter ? numberFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'book.language.languageName',
            text: "Langue",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Langue...'}) : null,
        }];

        let title = "Livres";
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity);
            title = "Liste des livres pour les Chercheurs";
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
                    data={bookList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'bookList.csv',
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
                                        {showBookAdd &&
                                            <BookAdd targetResearcher={targetResearcher}
                                                onHideAction={handleHideModal} />}
                                        {showBookDelete &&
                                            <BookDelete targetBook={targetBook}
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
                                            onClick={() => setShowBookAdd(true)}>
                                            <AiOutlinePlusCircle /> &nbsp; Ajouter un livre
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
                                    pagination={paginationFactory(paginationOptions(bookList.length))}
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

export default BookList;
