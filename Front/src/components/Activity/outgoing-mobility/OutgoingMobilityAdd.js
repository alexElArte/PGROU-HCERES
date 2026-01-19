import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addOutgoingMobility} from "../../../services/Activity/outgoing-mobility/OutgoingMobilityActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function OutgoingMobilityAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [namePersonConcerned, setNamePersonConcerned] = React.useState("");
    const [arrivalDate, setArrivalDate] = React.useState("");
    const [departureDate, setDepartureDate] = React.useState("");
    const [duration, setDuration] = React.useState(0);
    const [hostLabName, setHostLabName] = React.useState("");
    const [hostLabLocation, setHostLabLocation] = React.useState("");
    const [piPartner, setPiPartner] = React.useState("");
    const [projectTitle, setProjectTitle] = React.useState("");
    const [associatedFunding, setAssociatedFunding] = React.useState("");
    const [nbPublications, setNbPublications] = React.useState(0);
    const [publicationReference, setPublicationReference] = React.useState("");
    const [strategicRecurringCollab, setStrategicRecurringCollab] = React.useState(false);
    const [activeProject, setActiveProject] = React.useState(false);
    const [umrCoordinated, setUmrCoordinated] = React.useState(false);
    const [agreementSigned, setAgreementSigned] = React.useState(false);

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            namePersonConcerned: namePersonConcerned,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            duration: duration,
            hostLabName: hostLabName,
            hostLabLocation: hostLabLocation,
            piPartner: piPartner,
            projectTitle: projectTitle,
            associatedFunding: associatedFunding,
            nbPublications: nbPublications,
            publicationReference: publicationReference,
            strategicRecurringCollab: strategicRecurringCollab,
            activeProject: activeProject,
            umrCoordinated: umrCoordinated,
            agreementSigned: agreementSigned,
        };

        addOutgoingMobility(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "OutgoingMobility ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur OutgoingMobility non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>OutgoingMobility</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Chercheur
                        </label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId),[])}
                        />
                        <label className='label'>
                            Nom de la personne concernée
                        </label>
                        <input
                            type={"text"}
                            placeholder="Nom de la personne concernée"
                            className="input-container"
                            value={namePersonConcerned}
                            onChange={e => setNamePersonConcerned(e.target.value)}
                            required/>

                        <label className='label'>
                            Date d'arrivée
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setArrivalDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Date de départ
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setDepartureDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Durée
                        </label>
                        <input
                            type="number"
                            placeholder="Durée"
                            className="input-container"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            required/>

                        <label className='label'>
                            Nom du laboratoire hôte
                        </label>
                        <input
                            type={"text"}
                            placeholder="Nom du laboratoire hôte"
                            className="input-container"
                            value={hostLabName}
                            onChange={e => setHostLabName(e.target.value)}
                            required/>

                        <label className='label'>
                            Emplacement du laboratoire hôte
                        </label>
                        <input
                            type={"text"}
                            placeholder="Emplacement du laboratoire hôte"
                            className="input-container"
                            value={hostLabLocation}
                            onChange={e => setHostLabLocation(e.target.value)}
                            required/>

                        <label className='label'>
                            Pi Partenaire
                        </label>
                        <input
                            type={"text"}
                            placeholder="Pi Partenaire"
                            className="input-container"
                            value={piPartner}
                            onChange={e => setPiPartner(e.target.value)}
                            required/>

                        <label className='label'>
                            Titre du projet
                        </label>
                        <input
                            type={"text"}
                            placeholder="Titre du projet"
                            className="input-container"
                            value={projectTitle}
                            onChange={e => setProjectTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            Financement associé
                        </label>
                        <input
                            type={"text"}
                            placeholder="Financement associé"
                            className="input-container"
                            value={associatedFunding}
                            onChange={e => setAssociatedFunding(e.target.value)}
                            required/>

                        <label className='label'>
                            Nb Publications
                        </label>
                        <input
                            type="number"
                            placeholder="Nb Publications"
                            className="input-container"
                            value={nbPublications}
                            onChange={e => setNbPublications(e.target.value)}
                            required/>

                        <label className='label'>
                            Publication Référence
                        </label>
                        <input
                            type={"text"}
                            placeholder="Publication Référence"
                            className="input-container"
                            value={publicationReference}
                            onChange={e => setPublicationReference(e.target.value)}
                            required/>

                        <label className='label'>
                            Collaboration stratégique récurrente?
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setStrategicRecurringCollab(e.target.checked)}
                            />

                        <label className='label'>
                            Projet actif?
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setActiveProject(e.target.checked)}
                            />

                        <label className='label'>
                            Umr Coordonné?
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setUmrCoordinated(e.target.checked)}
                            />

                        <label className='label'>
                            Accord Signé?
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setAgreementSigned(e.target.checked)}
                            />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default OutgoingMobilityAdd;
