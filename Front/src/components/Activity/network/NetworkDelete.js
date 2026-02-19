import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import NetworkElement from "./NetworkElement";
import { deleteNetwork } from "../../../services/Activity/network/NetworkActions";
import { withTranslation } from "react-i18next";

function NetworkDelete(props) {
    const { t } = props;
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetNetwork = props.targetNetwork;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteNetwork(targetNetwork.idActivity)
        .then(response => {
            const msg = {
            successMsg: t("activity.network.success delete") + " " + targetNetwork.idActivity,
            };
            handleClose(msg);
        })
        .catch(error => {
            console.log(error);
            const msg = {
            errorMsg: t("activity.network.error delete") + " " + error.response.status,
            };
            handleClose(msg);
        })
        .finally(() => setIsLoading(false));
    };

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{t("activity.network.delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <NetworkElement targetNetwork={targetNetwork} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            {t("activity.close")}
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? <LoadingIcon color={"white"} /> : null}
            {isLoading ? t("activity.deleting") : t("activity.delete")}
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default withTranslation()(NetworkDelete);
