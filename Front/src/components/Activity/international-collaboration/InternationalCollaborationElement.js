import {ListGroup} from "react-bootstrap";

const InternationalCollaborationElement = (props) =>
    props.targetInternationalCollaboration && props.targetInternationalCollaboration.internationalCollaboration ?
        <ListGroup horizontal={props.horizontal}>
            <ListGroup.Item variant={"primary"}>ID : {props.targetInternationalCollaboration.idActivity}</ListGroup.Item>
            <ListGroup.Item>Titre de projet : {props.targetInternationalCollaboration.internationalCollaboration.projectTitle}</ListGroup.Item>
            <ListGroup.Item>pays État Ville : {props.targetInternationalCollaboration.internationalCollaboration.countryStateCity}</ListGroup.Item>
            <ListGroup.Item>Entité partenaire : {props.targetInternationalCollaboration.internationalCollaboration.partnerEntity}</ListGroup.Item>
            <ListGroup.Item>date de début du projet : {props.targetInternationalCollaboration.internationalCollaboration.dateProjectStart}</ListGroup.Item>
            <ListGroup.Item>Les partenaires pi : {props.targetInternationalCollaboration.internationalCollaboration.piPartners}</ListGroup.Item>
            <ListGroup.Item>Messagerie de Partenaires : {props.targetInternationalCollaboration.internationalCollaboration.mailPartners}</ListGroup.Item>
            <ListGroup.Item>Collaboration stratégique récurrente ? : {props.targetInternationalCollaboration.internationalCollaboration.strategicRecurringCollab ? "Oui" : "Non"}</ListGroup.Item>
            <ListGroup.Item>Projet actif ? : {props.targetInternationalCollaboration.internationalCollaboration.activeProject ? "Oui" : "Non"}</ListGroup.Item>
            <ListGroup.Item>Financement associé : {props.targetInternationalCollaboration.internationalCollaboration.associatedFunding}</ListGroup.Item>
            <ListGroup.Item>nombre Publications résultantes : {props.targetInternationalCollaboration.internationalCollaboration.numberResultingPublications}</ListGroup.Item>
            <ListGroup.Item>réf Publication conjointe : {props.targetInternationalCollaboration.internationalCollaboration.refJointPublication}</ListGroup.Item>
            <ListGroup.Item>umr Coordonné ? : {props.targetInternationalCollaboration.internationalCollaboration.umrCoordinated ? "Oui" : "Non"}</ListGroup.Item>
            <ListGroup.Item>accord signé ? : {props.targetInternationalCollaboration.internationalCollaboration.agreementSigned ? "Oui" : "Non"}</ListGroup.Item>
        </ListGroup> : "Target internationalCollaboration is not send as props!"


export default InternationalCollaborationElement