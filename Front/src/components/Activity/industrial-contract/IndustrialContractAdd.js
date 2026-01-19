import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addIndustrialContract} from "../../../services/Activity/industrial-contract/IndustrialContractActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function IndustrialContractAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherIds, setResearcherIds] = React.useState([]); // tableau d'IDs
    const [StartDate, setStartDate] = React.useState("");
    const [NameCompanyInvolved, setNameCompanyInvolved] = React.useState("");
    const [ProjectTitle, setProjectTitle] = React.useState("");
    const [AgreementAmount, setAgreementAmount] = React.useState("");
    const [EndDate, setEndDate] = React.useState("");
    const [AssociatedPubliRef, setAssociatedPubliRef] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherIds: researcherIds,
            AssociatedPubliRef: AssociatedPubliRef,
            EndDate: EndDate,
            AgreementAmount: AgreementAmount,
            ProjectTitle: ProjectTitle,
            NameCompanyInvolved: NameCompanyInvolved,
            StartDate: StartDate
        };

        addIndustrialContract(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "Industrial R&D contracts add with an id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Error Industrial R&D contracts not added , response status: " + error.response.status,
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
                        <Modal.Title>Industrial R&D contracts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Researcher
                        </label>
                        <ResearcherSelect
                            isMulti={true}
                            targetResearcher={targetResearcher} // optionnel, si tu veux pré-remplir
                            onchange={React.useCallback((researcherIds) => setResearcherIds(researcherIds), [])}
                        />

                        <label className='label'>
                            Start Date
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setStartDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Name Company Involved
                        </label>
                        <input
                            placeholder='Description'
                            className='input-container'
                            name="Name Company Involved"
                            type="text"
                            value={NameCompanyInvolved}
                            onChange={e => setNameCompanyInvolved(e.target.value)}
                            required/>


                        <label className='label'>
                            Project Title
                        </label>
                        <input
                            placeholder='ProjectTitle '
                            className='input-container'
                            name="ProjectTitle"
                            type="ProjectTitle"
                            value={ProjectTitle}
                            onChange={e => setProjectTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            Agreement Amount
                        </label>
                        <input
                            type="number"
                            placeholder='Affiliation'
                            className='input-container'
                            name="AgreementAmount"
                            value={AgreementAmount}
                            onChange={e => setAgreementAmount(e.target.value)}
                            required/>

                        <label className='label'>
                            End Date
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setEndDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Associated Publication References
                        </label>
                        <input
                            placeholder='ProjectTitle '
                            className='input-container'
                            name="AssociatedPubliRef"
                            type="AssociatedPubliRef"
                            value={AssociatedPubliRef}
                            onChange={e => setAssociatedPubliRef(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? 'Adding...' : 'Add'}
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default IndustrialContractAdd;
