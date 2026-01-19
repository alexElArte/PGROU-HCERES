import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import { addCompanyCreation } from "../../../services/Activity/company-creation/CompanyCreationActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function CompanyCreationAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form state (Add Template)
    const [formData, setFormData] = React.useState({
        companyCreationName: "",
        companyCreationDate: "",
        companyCreationActive: false,
    });

    // liste des chercheurs associés
    const [researcherIds, setResearcherIds] = React.useState([]);

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            ...formData,
            researcherIds: researcherIds, // 🔹 tableau d'IDs envoyé au back
        };

        addCompanyCreation(data)
            .then(response => {
                const msg = {
                    successMsg:
                        "Creation of company / start up added with an id " +
                        response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.log(error);
                const msg = {
                    errorMsg:
                        "Error Creation of company / start up not added, response status: " +
                        error.response.status,
                };
                handleClose(msg);
            })
            .finally(() => setIsLoading(false));
    };

    const handleFormChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Creation of company / start up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label className='label'>
                            Researchers
                        </label>
                        <ResearcherSelect
                            isMulti={true}                      // 🔹 multi-sélection
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(
                                (ids) => setResearcherIds(ids), // 🔹 ids = tableau d'IDs
                                []
                            )}
                        />

                        <label className='label'>
                            Company Name
                        </label>
                        <input
                            name="companyCreationName"
                            type="text"
                            placeholder="Company Name"
                            className="input-container"
                            value={formData.companyCreationName}
                            onChange={handleFormChange}
                            required
                        />

                        <label className='label'>
                            Creation Date
                        </label>
                        <input
                            name="companyCreationDate"
                            type="date"
                            className='input-container'
                            value={formData.companyCreationDate}
                            onChange={handleFormChange}
                            required
                        />

                        <label className='label'>
                            Is the company Active?
                        </label>
                        <input
                            name="companyCreationActive"
                            type="checkbox"
                            className="input-container"
                            checked={formData.companyCreationActive}
                            onChange={handleFormChange}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingIcon /> : null}
                            {isLoading ? 'Adding...' : 'Add'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default CompanyCreationAdd;
