import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addNetwork} from "../../../services/Activity/network/NetworkActions";
import { withTranslation } from 'react-i18next';

function NetworkAdd(props) {
    const { t } = props;
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

        addNetwork(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                successMsg: t('activity.network.success add') + ' ' + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                errorMsg: t('activity.network.error add') + ' ' + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t("activity.network.title")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>{t("common.researcher")}</label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId), [])}
                        />

                        <label className='label'>{t("activity.network.nameNetwork")}</label>
                        <input
                            type="text"
                            className='input-container'
                            placeholder={t("activity.network.nameNetwork")}
                            onChange={e => setNetworkNameNetwork(e.target.value)}
                            required
                        />

                        <label className='label'>{t("activity.network.startDate")}</label>
                        <input
                            type="date"
                            className="input-container"
                            placeholder={t("activity.network.startDate")}
                            value={startDate}
                            onChange={e => setNetworkStartDate(e.target.value)}
                            required
                        />

                        <label className='label'>{t("activity.network.activeNetwork")}</label>
                        <select
                            className='input-container'
                            onChange={e => {
                                const val = e.target.value === "true";
                                setActiveNetwork(val);
                            }}
                            required
                        >
                            <option value="true">{t("common.yes")}</option>
                            <option value="false">{t("common.no")}</option>
                        </select>

                        <label className='label'>{t("activity.network.associatedFunding")}</label>
                        <input
                            type="text"
                            className='input-container'
                            placeholder={t("activity.network.associatedFunding")}
                            onChange={e => setAssociatedFunding(e.target.value)}
                        />

                        <label className='label'>{t("activity.network.nbResultingPublications")}</label>
                        <input
                            type="number"
                            className='input-container'
                            placeholder={t("activity.network.nbResultingPublications")}
                            onChange={e => setNbResultingPublications(e.target.value)}
                        />

                        <label className='label'>{t("activity.network.refResultingPublications")}</label>
                        <input
                            type="text"
                            className='input-container'
                            placeholder={t("activity.network.refResultingPublications")}
                            onChange={e => setRefResultingPublications(e.target.value)}
                        />

                        <label className='label'>{t("activity.network.umrCoordinated")}</label>
                        <input
                            type="text"
                            className='input-container'
                            placeholder={t("activity.network.umrCoordinated")}
                            onChange={e => setUmrCoordinated(e.target.value)}
                        />

                        <label className='label'>{t("activity.network.agreementSigned")}</label>
                        <input
                            type="text"
                            className='input-container'
                            placeholder={t("activity.network.agreementSigned")}
                            onChange={e => setAgreementSigned(e.target.value)}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {t("activity.close")}
                        </Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingIcon /> : null}
                            {isLoading ? t("activity.adding") : t("activity.add")}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>

    );
}

export default withTranslation()(NetworkAdd);
