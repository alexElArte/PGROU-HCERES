import {ListGroup} from "react-bootstrap";

const ScientificExpertiseElement = (props) =>
    props.targetScientificExpertise && props.targetScientificExpertise.scientificExpertise ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetScientificExpertise.idActivity}</ListGroup.Item>
        <ListGroup.Item>Type d'expertise scientifique : {props.targetScientificExpertise.scientificExpertise.scientificExpertiseTypeId.nameChoice}</ListGroup.Item>
        <ListGroup.Item>description : {props.targetScientificExpertise.scientificExpertise.description}</ListGroup.Item>
        <ListGroup.Item>date de début : {props.targetScientificExpertise.scientificExpertise.startDate}</ListGroup.Item>
        <ListGroup.Item>date de fin : {props.targetScientificExpertise.scientificExpertise.endDate}</ListGroup.Item>
    </ListGroup> : "Target scientificExpertise is not send as props!"


export default ScientificExpertiseElement