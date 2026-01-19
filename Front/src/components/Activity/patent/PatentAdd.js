import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addPatent} from "../../../services/Activity/patent/PatentActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function PatentAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [title, setTitle] = React.useState("");
    const [registrationDate, setRegistrationDate] = React.useState("");
    const [filingDate, setFilingDate] = React.useState("");
    const [acceptationDate, setAcceptationDate] = React.useState("");
    const [licensingDate, setLicensingDate] = React.useState("");
    const [inventors, setInventors] = React.useState("");
    const [coOwners, setCoOwners] = React.useState("");
    const [priorityNumber, setPriorityNumber] = React.useState(0);
    const [priorityDate, setPriorityDate] = React.useState("");
    const [publicationNumber, setPublicationNumber] = React.useState("");
    const [publicationDate, setPublicationDate] = React.useState("");
    const [inpiLink, setInpiLink] = React.useState("");
    const [status, setStatus] = React.useState(false);
    const [pctExtensionObtained, setPctExtensionObtained] = React.useState(false);
    const [publicationNumberPctExtension, setPublicationNumberPctExtension] = React.useState("");
    const [publicationDatePctExtension, setPublicationDatePctExtension] = React.useState("");
    const [internationalExtension, setInternationalExtension] = React.useState(false);
    const [publicationNumberInternationalExtension, setPublicationNumberInternationalExtension] = React.useState("");
    const [publicationDateInternationalExtension, setPublicationDateInternationalExtension] = React.useState("");
    const [refTransferContract, setRefTransferContract] = React.useState("");
    const [nameCompanyInvolved, setNameCompanyInvolved] = React.useState("");
    const [nameChoice, setNameChoice] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            title: title,
            registrationDate: registrationDate,
            filingDate: filingDate,
            acceptationDate: acceptationDate,
            licensingDate: licensingDate,
            inventors: inventors,
            coOwners: coOwners,
            priorityNumber: priorityNumber,
            priorityDate: priorityDate,
            publicationNumber: publicationNumber,
            publicationDate: publicationDate,
            inpiLink: inpiLink,
            status: status,
            pctExtensionObtained: pctExtensionObtained,
            publicationNumberPctExtension: publicationNumberPctExtension,
            publicationDatePctExtension: publicationDatePctExtension,
            internationalExtension: internationalExtension,
            publicationNumberInternationalExtension: publicationNumberInternationalExtension,
            publicationDateInternationalExtension: publicationDateInternationalExtension,
            refTransferContract: refTransferContract,
            nameCompanyInvolved: nameCompanyInvolved,
            nameChoice: nameChoice,
        };

        addPatent(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "Patent ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur Patent non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>Patent</Modal.Title>
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
                            Titre
                        </label>
                        <input
                            type={"text"}
                            placeholder="Titre"
                            className="input-container"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            Date d'inscription
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setRegistrationDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Date de dépôt
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setFilingDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Date d'acceptation
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setAcceptationDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Date de licence
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setLicensingDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Inventeurs
                        </label>
                        <input
                            type={"text"}
                            placeholder="Inventeurs"
                            className="input-container"
                            value={inventors}
                            onChange={e => setInventors(e.target.value)}
                            required/>

                        <label className='label'>
                            Copropriétaires
                        </label>
                        <input
                            type={"text"}
                            placeholder="Copropriétaires"
                            className="input-container"
                            value={coOwners}
                            onChange={e => setCoOwners(e.target.value)}
                            required/>

                        <label className='label'>
                            Numéro de priorité
                        </label>
                        <input
                            type="number"
                            placeholder="Numéro de priorité"
                            className="input-container"
                            value={priorityNumber}
                            onChange={e => setPriorityNumber(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de priorité
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setPriorityDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Numéro de publication
                        </label>
                        <input
                            type={"text"}
                            placeholder="Numéro de publication"
                            className="input-container"
                            value={publicationNumber}
                            onChange={e => setPublicationNumber(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de publication
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setPublicationDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Lien inpi
                        </label>
                        <input
                            type={"text"}
                            placeholder="Lien inpi"
                            className="input-container"
                            value={inpiLink}
                            onChange={e => setInpiLink(e.target.value)}
                            required/>

                        <label className='label'>
                            Statut
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setStatus(e.target.checked)}/>

                        <label className='label'>
                            Pct extension obtenue
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setPctExtensionObtained(e.target.checked)}
                            />

                        <label className='label'>
                            Numéro de publication Pct Extension
                        </label>
                        <input
                            type={"text"}
                            placeholder="Numéro de publication Pct Extension"
                            className="input-container"
                            value={publicationNumberPctExtension}
                            onChange={e => setPublicationNumberPctExtension(e.target.value)}
                            required/>

                        <label className='label'>
                            Publication Date Pct Prolongation
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setPublicationDatePctExtension(e.target.value)}
                            required/>


                        <label className='label'>
                            Extension internationale
                        </label>
                        <input
                            type="checkbox"
                            className="input-container"
                            onChange={e => setInternationalExtension(e.target.checked)}
                            />

                        <label className='label'>
                            Numéro de publication Extension internationale
                        </label>
                        <input
                            type={"text"}
                            placeholder="Numéro de publication Extension internationale"
                            className="input-container"
                            value={publicationNumberInternationalExtension}
                            onChange={e => setPublicationNumberInternationalExtension(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de publication Extension internationale
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setPublicationDateInternationalExtension(e.target.value)}
                            required/>


                        <label className='label'>
                            Ref Contrat de Transfert
                        </label>
                        <input
                            type={"text"}
                            placeholder="Ref Contrat de Transfert"
                            className="input-container"
                            value={refTransferContract}
                            onChange={e => setRefTransferContract(e.target.value)}
                            required/>

                        <label className='label'>
                            Nom Société impliquée
                        </label>
                        <input
                            type={"text"}
                            placeholder="Nom Société impliquée"
                            className="input-container"
                            value={nameCompanyInvolved}
                            onChange={e => setNameCompanyInvolved(e.target.value)}
                            required/>

                        <label className='label'>
                            Nom Choix
                        </label>
                        <input
                            type={"text"}
                            placeholder="Nom Choix"
                            className="input-container"
                            value={nameChoice}
                            onChange={e => setNameChoice(e.target.value)}
                            required/>

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

export default PatentAdd;
