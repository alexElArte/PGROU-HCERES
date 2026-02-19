import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import PostDocElement from "./PostDocElement";
import {deletePostDoc} from "../../../services/Activity/post-doc/PostDocActions";
import { withTranslation } from 'react-i18next';

function PostDocDelete(props) {
    const { t } = props;
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetPostDoc = props.targetPostDoc;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deletePostDoc(targetPostDoc.idActivity)
            .then(response => {
                const msg = {
                    successMsg: t('activity.post-docs.success delete') + ' ' + response.data.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                errorMsg: t('activity.post-docs.error delete') + ' ' + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t('activity.post-docs.delete')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostDocElement targetPostDoc={targetPostDoc}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('activity.close')}
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? t('activity.deleting') : t('activity.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default withTranslation()(PostDocDelete);

