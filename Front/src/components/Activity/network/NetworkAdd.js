import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addNetwork} from "../../../services/Activity/network/NetworkActions";

function NetworkAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI states
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form states
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [startDate, setNetworkStartDate] = React.useState("");
    const [nameNetwork, setNetworkNameNetwork] = React.useState("");
    const [activeNetwork, setActiveNetwork] = React.useState("");
    const [associatedFunding, setAssociatedFunding] = React.useState("");
    const [nbResultingPublications, setNbResultingPublications] = React.useState("");
    const [refResultingPublications, setRefResultingPublications] = React.useState("");
    const [umrCoordinated, setUmrCoordinated] = React.useState("");
    const [agreementSigned, setAgreementSigned] = React.useState(""); 

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        // ✅ on envoie exactement les clés que ton service Java attend
        const data = {
            researcherId: researcherId,
            startDate: startDate,
            nameNetwork: nameNetwork,
            activeNetwork: activeNetwork,
            associatedFunding: associatedFunding,
            nbResultingPublications: nbResultingPublications,
            refResultingPublications: refResultingPublications,
            umrCoordinated: umrCoordinated,
            agreementSigned: agreementSigned,
        };

        addNetwork(data)
            .then(response => {
                const msg = {
                    successMsg: "Network ajouté avec un id " + response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.error(error);
                const msg = {
                    errorMsg: "Erreur : network non ajouté (status " + (error?.response?.status || "inconnu") + ")",
                };
                handleClose(msg);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Network</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>Chercheur</label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId), [])}
                        />

                        <label className='label'>Nom</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setNetworkNameNetwork(e.target.value)}
                            required
                        />

                        <label className='label'>Date début</label>
                        <input
                            type="date"
                            placeholder="start date"
                            className="input-container"
                            value={startDate}
                            onChange={e => setNetworkStartDate(e.target.value)}
                            required
                        />

                        <label className='label'>Active</label>
                        <select
                            className='input-container'
                            onChange={e => {
                                // Conversion de la string en vrai booléen
                                const val = e.target.value === "true";
                                setActiveNetwork(val);
                            }}
                            required
                        >
                            <option value="">Choisir...</option>
                            <option value="true">Oui (True)</option>
                            <option value="false">Non (False)</option>
                        </select>

                        <label className='label'>Financement associé</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setAssociatedFunding(e.target.value)}
                        />

                        <label className='label'>Nombre de publications résultantes</label>
                        <input
                            type="number"
                            className='input-container'
                            onChange={e => setNbResultingPublications(e.target.value)}
                        />

                        <label className='label'>Référence de publications résultantes</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setRefResultingPublications(e.target.value)}
                        />

                        <label className='label'>Contact UMR</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setUmrCoordinated(e.target.value)}
                        />

                        <label className='label'>Accord signé</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setAgreementSigned(e.target.value)}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingIcon /> : null}
                            {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default NetworkAdd;
