import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {addEducation} from "../../../services/Activity/education/EducationActions";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";

import { useTranslation } from 'react-i18next';

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function EducationAdd(props) {
    const { t } = useTranslation();
    
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [educationCourseName, setEducationCourseName] = React.useState("");
    const [educationFormation, setEducationFormation] = React.useState("");
    const [educationDescription, setEducationDescription] = React.useState("");
    const [educationInvolvementName, setEducationInvolvementName] = React.useState("");
    const [educationLevelText, setEducationLevelText] = React.useState("");
    const [educationCompletionDate, setEducationCompletionDate] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            educationCourseName: educationCourseName,
            educationFormation: educationFormation,
            educationDescription: educationDescription,
            educationInvolvementName: educationInvolvementName,
            educationLevelText: educationLevelText,
            educationCompletion: educationCompletionDate
        };

        addEducation(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": t("activity.education.success add") + " " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": t("activity.education.error add") + " " + error.response.status,
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
                        <Modal.Title>{t("activity.education.title")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            {t("common.researcher")}
                        </label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId), [])}
                        />
                        <label className='label'>
                            {t("activity.education.nameTeaching")}
                        </label>
                        <input
                            placeholder={t("activity.education.nameTeaching")}
                            className='input-container'
                            name="educationCourseName"
                            type="educationCourseName"
                            value={educationCourseName}
                            onChange={e => setEducationCourseName(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("activity.education.formation")}
                        </label>
                        <input
                            placeholder={t("activity.education.formation")}
                            className='input-container'
                            name="educationFormation"
                            type="educationFormation"
                            value={educationFormation}
                            onChange={e => setEducationFormation(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("activity.education.description")}
                        </label>
                        <input
                            placeholder={t("activity.education.description")}
                            className='input-container'
                            name="educationDescription"
                            type="educationDescription"
                            value={educationDescription}
                            onChange={e => setEducationDescription(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("activity.education.involvement")}
                        </label>
                        <input
                            placeholder={t("activity.education.involvement")}
                            className='input-container'
                            name="educationInvolvementName"
                            type="educationInvolvementName"
                            value={educationInvolvementName}
                            onChange={e => setEducationInvolvementName(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("activity.education.level")}
                        </label>
                        <input
                            placeholder={t("activity.education.level")}
                            className='input-container'
                            name="educationLevelText"
                            type="educationLevelText"
                            value={educationLevelText}
                            onChange={e => setEducationLevelText(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("activity.education.completionDate")}
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setEducationCompletionDate(e.target.value)}
                            required/>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {t("common.cancel")}
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {t(isLoading ? 'common.adding' : 'common.add')}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default EducationAdd;
