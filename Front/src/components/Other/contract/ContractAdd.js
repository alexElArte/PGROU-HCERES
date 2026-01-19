import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {addContract} from "../../../services/Other/contract/ContractActions";
import ResearcherSelect from "../../util/ResearcherSelect";
import StatusSelect from "../../util/StatusSelect";
import LoadingIcon from "../../util/LoadingIcon";
import ContractTypeSelect from "./ContractTypeSelect";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function ContractAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const targetContractType = props.targetContractType;
    const targetStatus = props.targetStatus;
    const onHideParentAction = props.onHideAction

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [startContract, setStartContract] = React.useState("");
    const [endContract, setEndContract] = React.useState("");
    const [functionContract, setFunctionContract] = React.useState("");
    const [contractTypeId, setContractTypeId] = React.useState(targetContractType ? targetContractType.contractTypeId : "");
    const [nameEmployer, setNameEmployer] = React.useState("");
    const [statusId, setStatusId] = React.useState(targetStatus ? targetStatus.statusId : "");

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            startContract: startContract,
            endContract: endContract,
            functionContract: functionContract,
            contractTypeId: contractTypeId,
            nameEmployer: nameEmployer,
            statusId: statusId
        };

        addContract(data).then(response => {
            const contractId = response.data.contractId;
            const msg = {
                "successMsg": "Contrat ajouté avec un id " + response.data.contractId,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur: Contrat non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>Contrat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            Chercheur
                        </label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId), [])}
                        />
                        <label className='label'>
                            Date de départ
                        </label>
                        <input
                            placeholder='Date de départ'
                            className='input-container'
                            name="startContract"
                            type="date"
                            value={startContract}
                            onChange={e => setStartContract(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de fin
                        </label>
                        <input
                            placeholder='Date de fin'
                            className='input-container'
                            name="endContract"
                            type="date"
                            value={endContract}
                            onChange={e => setEndContract(e.target.value)}
                            required/>

                        <label className='label'>
                            Fonction
                        </label>
                        <input
                            placeholder='Fonction du contrat'
                            className='input-container'
                            name="functionContract"
                            type="functionContract"
                            value={functionContract}
                            onChange={e => setFunctionContract(e.target.value)}
                            required/>

                        <label className='label'>
                            Type du contrat
                        </label>
                        <ContractTypeSelect
                            onchange={React.useCallback(id => setContractTypeId(id), [])}/>

                        <label className='label'>
                            Employeur
                        </label>
                        <input
                            placeholder="Nom de l'employeur"
                            className='input-container'
                            name="nameEmployer"
                            type="nameEmployer"
                            value={nameEmployer}
                            onChange={e => setNameEmployer(e.target.value)}
                            required/>

                        <label className='label'>
                            Statut
                        </label>
                        <StatusSelect
                            onchange={React.useCallback(ids => setStatusId(ids), [])}/>

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

export default ContractAdd;