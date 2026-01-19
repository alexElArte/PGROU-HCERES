import {ListGroup} from "react-bootstrap";

const OutgoingMobilityElement = (props) =>
    props.targetOutgoingMobility && props.targetOutgoingMobility.outgoingMobility ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetOutgoingMobility.idActivity}</ListGroup.Item>
            <ListGroup.Item>Nom de la personne concernée : {props.targetOutgoingMobility.outgoingMobility.namePersonConcerned}</ListGroup.Item>
            <ListGroup.Item>Date d'arrivée : {props.targetOutgoingMobility.outgoingMobility.arrivalDate}</ListGroup.Item>
            <ListGroup.Item>Date de départ : {props.targetOutgoingMobility.outgoingMobility.departureDate}</ListGroup.Item>
            <ListGroup.Item>Durée : {props.targetOutgoingMobility.outgoingMobility.duration}</ListGroup.Item>
            <ListGroup.Item>Nom du laboratoire hôte : {props.targetOutgoingMobility.outgoingMobility.hostLabName}</ListGroup.Item>
            <ListGroup.Item>Emplacement du laboratoire hôte : {props.targetOutgoingMobility.outgoingMobility.hostLabLocation}</ListGroup.Item>
            <ListGroup.Item>Pi Partenaire : {props.targetOutgoingMobility.outgoingMobility.piPartner}</ListGroup.Item>
            <ListGroup.Item>Titre du projet : {props.targetOutgoingMobility.outgoingMobility.projectTitle}</ListGroup.Item>
            <ListGroup.Item>Financement associé : {props.targetOutgoingMobility.outgoingMobility.associatedFunding}</ListGroup.Item>
            <ListGroup.Item>Nb Publications : {props.targetOutgoingMobility.outgoingMobility.nbPublications}</ListGroup.Item>
            <ListGroup.Item>Publication Référence : {props.targetOutgoingMobility.outgoingMobility.publicationReference}</ListGroup.Item>
            <ListGroup.Item>Collaboration stratégique récurrente? : {props.targetOutgoingMobility.outgoingMobility.strategicRecurringCollab?'True':'False'}</ListGroup.Item>
            <ListGroup.Item>Projet actif? : {props.targetOutgoingMobility.outgoingMobility.activeProject?'True':'False'}</ListGroup.Item>
            <ListGroup.Item>Umr Coordonné? : {props.targetOutgoingMobility.outgoingMobility.umrCoordinated?'True':'False'}</ListGroup.Item>
            <ListGroup.Item>Accord Signé? : {props.targetOutgoingMobility.outgoingMobility.agreementSigned?'True':'False'}</ListGroup.Item>
    </ListGroup> : "Target outgoingMobility is not send as props!"


export default OutgoingMobilityElement