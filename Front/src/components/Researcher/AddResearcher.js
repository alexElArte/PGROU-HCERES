import React from 'react';
import './Researcher.css';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../util/LoadingIcon";
import TeamSelect from "../util/TeamSelect";
import {addResearcher, updateResearcher} from "../../services/Researcher/ResearcherActions";

/**
 * add or edit researcher if present in props.targetResearcher
 */
function AddResearcher(props) {
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
                    "successMsg": "Mise à jour du chercheur réussie. [id= " + researcherId + "]"
                }
                handleClose(msg);
            }).catch(error => {
            console.error('Erreur lors de la mise à jour du chercheur :', error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? `Échec de la mise à jour du chercheur, statut de réponse : ${status}`
                    : `Échec de la mise à jour du chercheur. ${error.message || 'Aucune réponse du serveur.'}`
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
                    "successMsg": "Chercheur ajouté avec l'id " + researcherId,
                }
                handleClose(msg);
            }).catch(error => {
            console.error('Erreur lors de la mise à jour du chercheur :', error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? `Échec de l'ajout, statut de réponse : ${status}`
                    : `Échec de l'ajout. ${error.message || 'Aucune réponse du serveur.'}`
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
                            {!targetResearcher && <div>Add a Researcher</div>}
                            {targetResearcher && <div>Update a Researcher</div>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            Name of the researcher
                        </label>
                        <input
                            placeholder='Prénom'
                            className='input-container'
                            name="AddResearcherFirstName"
                            type="AddResearcherFirstName"
                            value={AddResearcherFirstName}
                            onChange={e => setAddResearcherFirstName(e.target.value)}
                            required/>
                        <label className='label'>
                            Surname of the researcher
                        </label>
                        <input
                            placeholder='Nom'
                            className='input-container'
                            name="AddResearcherLastName"
                            type="AddResearcherLastName"
                            value={AddResearcherLastName}
                            onChange={e => setAddResearcherLastName(e.target.value)}
                            required/>

                        <label className='label'>
                            Email of the researcher
                        </label>
                        <input
                            placeholder='Email'
                            className='input-container'
                            name="AddResearcherEmail"
                            type="AddResearcherEmail"
                            value={AddResearcherEmail}
                            onChange={e => setAddResearcherEmail(e.target.value)}
                            required/>

                        <label className='label'>
                            Team of the researcher
                        </label>
                        <TeamSelect
                            onchange={React.useCallback(ids => setTeamIds(ids), [])}/>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => silentClose()}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {!targetResearcher &&
                                (isLoading ? 'Ajout en cours...' : "Ajouter")
                            }
                            {targetResearcher &&
                                (isLoading ? 'Mise à jour en cours...' : "Mettre à jour")
                            }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default AddResearcher;
