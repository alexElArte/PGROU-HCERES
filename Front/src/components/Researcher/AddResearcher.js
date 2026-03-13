import React from 'react';
import './Researcher.css';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../util/LoadingIcon";
import TeamSelect from "../util/TeamSelect";
import {addResearcher, updateResearcher} from "../../services/Researcher/ResearcherActions";
import {useTranslation} from "react-i18next";

/**
 * add or edit researcher if present in props.targetResearcher
 */
function AddResearcher(props) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const targetResearcher = props.targetResearcher;

    const silentClose = () => {
        setShowModal(false);
        props.onHideAction();
    };

    const handleClose = (msg) => {
        setShowModal(false);
        props.onHideAction(msg);
    };

    const [AddResearcherFirstName, setAddResearcherFirstName] = React.useState(targetResearcher ? targetResearcher.researcherName : "");
    const [AddResearcherLastName, setAddResearcherLastName] = React.useState(targetResearcher ? targetResearcher.researcherSurname : "");
    const [AddResearcherEmail, setAddResearcherEmail] = React.useState(targetResearcher ? targetResearcher.researcherEmail : "");
    const [teamIds, setTeamIds] = React.useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "researcherSurname": AddResearcherLastName,
            "researcherName": AddResearcherFirstName,
            "researcherEmail": AddResearcherEmail,
            "teamIds": teamIds,
        };
        if (targetResearcher) {
            handleUpdateResearcher(data)
        } else {
            handleAddResearcher(data)
        }
    }

    const handleUpdateResearcher = (data) => {
        setIsLoading(true)
        updateResearcher(targetResearcher.researcherId, data)
            .then(response => {
                const researcherId = response.data.researcherId;
                const msg = {
                    "researcherUpdated": response.data,
                    "successMsg": t("members.researcher update success", {id: researcherId})
                }
                handleClose(msg);
            }).catch(error => {
            console.error('Erreur lors de la mise à jour du chercheur :', error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? t("members.researcher update failed status", {status})
                    : t("members.researcher update failed", {
                        message: error.message || t("members.no server response")
                    })
            };
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    const handleAddResearcher = (data) => {
        setIsLoading(true);
        addResearcher(data)
            .then(response => {
                const researcherId = response.data.researcherId;
                const msg = {
                    "researcherAdded": response.data,
                    "successMsg": t("members.researcher add success", {id: researcherId}),
                }
                handleClose(msg);
            }).catch(error => {
            console.error('Erreur lors de la mise à jour du chercheur :', error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? t("members.researcher add failed status", {status})
                    : t("members.researcher add failed", {
                        message: error.message || t("members.no server response")
                    })
            };
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Modal show={showModal} onHide={() => silentClose()}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {!targetResearcher && <div>{t("members.add researcher title")}</div>}
                            {targetResearcher && <div>{t("members.update researcher title")}</div>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            {t("members.first name")}
                        </label>
                        <input
                            placeholder={t("members.first name")}
                            className='input-container'
                            name="AddResearcherFirstName"
                            type="text"
                            value={AddResearcherFirstName}
                            onChange={e => setAddResearcherFirstName(e.target.value)}
                            required/>
                        <label className='label'>
                            {t("members.last name")}
                        </label>
                        <input
                            placeholder={t("members.last name")}
                            className='input-container'
                            name="AddResearcherLastName"
                            type="text"
                            value={AddResearcherLastName}
                            onChange={e => setAddResearcherLastName(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("members.email")}
                        </label>
                        <input
                            placeholder={t("members.email")}
                            className='input-container'
                            name="AddResearcherEmail"
                            type="email"
                            value={AddResearcherEmail}
                            onChange={e => setAddResearcherEmail(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("members.team")}
                        </label>
                        <TeamSelect
                            onchange={React.useCallback(ids => setTeamIds(ids), [])}/>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => silentClose()}>
                            {t("common.cancel")}
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {!targetResearcher &&
                                (isLoading ? t("members.add in progress") : t("common.add"))
                            }
                            {targetResearcher &&
                                (isLoading ? t("members.update in progress") : t("members.update action"))
                            }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default AddResearcher;
