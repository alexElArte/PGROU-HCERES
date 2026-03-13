import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ResearcherSelect from '../../util/ResearcherSelect';
import LoadingIcon from '../../util/LoadingIcon';
import {addPostDoc} from '../../../services/Activity/post-doc/PostDocActions';
import { withTranslation } from 'react-i18next';

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function PostDocAdd(props) {
    const { t } = props;
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherIds, setResearcherIds] = React.useState([]); // tableau d'IDs
    const [name, setName] = React.useState('');
    const [duration, setDuration] = React.useState(''); // number
    const [nationality, setNationality] = React.useState('');
    const [originalLab, setOriginalLab] = React.useState('');
    const [associatedFunding, setAssociatedFunding] = React.useState('');
    const [associatedPubliRef, setAssociatedPubliRef] = React.useState('');
    const [arrivalDate, setArrivalDate] = React.useState('');
    const [departureDate, setDepartureDate] = React.useState('');


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherIds: researcherIds,
            postDocName: name,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            duration: duration,
            nationality: nationality,
            originalLab: originalLab,
            associatedFunding: associatedFunding,
            associatedPubliRef: associatedPubliRef,
        };

        addPostDoc(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                successMsg: t('activity.post-docs.success add') + ' ' + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                errorMsg: t('activity.post-docs.error add') + ' ' + error.response.status,
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
                        <Modal.Title>{t('activity.post-docs.add')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            {t('common.researcher')}
                        </label>
                        <ResearcherSelect
                            isMulti={true}
                            targetResearcher={targetResearcher} // optionnel, si tu veux pré-remplir
                            onchange={React.useCallback((researcherIds) => setResearcherIds(researcherIds), [])}
                        />
                        <label className='label'>
                            {t('activity.post-docs.namePostDoc')}
                        </label>
                        <input
                            placeholder={t('activity.post-docs.namePostDoc')}
                            className='input-container'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required/>

                        <label className='label'>
                            {t('activity.post-docs.arrivalDate')}
                        </label>
                        <input
                            type='date'
                            className='input-container'
                            onChange={e => setArrivalDate(e.target.value)}
                            required/>

                        <label className='label'>
                            {t('activity.post-docs.departureDate')}
                        </label>
                        <input
                            type='date'
                            className='input-container'
                            onChange={e => setDepartureDate(e.target.value)}
                            required/>


                        <label className='label'>
                            {t('activity.post-docs.duration')}
                        </label>
                        <input
                            type='number'
                            placeholder={t('activity.post-docs.duration')}
                            className='input-container'
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            required/>


                        <label className='label'>
                            {t('activity.post-docs.nationality')}
                        </label>
                        <input
                            placeholder={t('activity.post-docs.nationality')}
                            className='input-container'
                            value={nationality}
                            onChange={e => setNationality(e.target.value)}
                            required/>

                        <label className='label'>
                            {t('activity.post-docs.originalLab')}
                        </label>
                        <input
                            placeholder={t('activity.post-docs.originalLab')}
                            className='input-container'
                            value={originalLab}
                            onChange={e => setOriginalLab(e.target.value)}
                            required/>

                        <label className='label'>
                            {t('activity.post-docs.associatedFunding')}
                        </label>
                        <input
                            placeholder={t('activity.post-docs.associatedFunding')}
                            className='input-container'
                            value={associatedFunding}
                            onChange={e => setAssociatedFunding(e.target.value)}
                            required/>

                        <label className='label'>
                            {t('activity.post-docs.associatedPubliRef')}
                        </label>
                        <input
                            placeholder={t('activity.post-docs.associatedPubliRef')}
                            className='input-container'
                            value={associatedPubliRef}
                            onChange={e => setAssociatedPubliRef(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            {t('activity.close')}
                        </Button>
                        <Button variant='outline-primary' type={'submit'} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? t('activity.adding') : t('activity.add')}

                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default withTranslation()(PostDocAdd);
