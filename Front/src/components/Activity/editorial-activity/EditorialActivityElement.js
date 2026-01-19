import {ListGroup} from "react-bootstrap";

const EditorialActivityElement = (props) =>
    props.targetEditorialActivity && props.targetEditorialActivity.editorialActivity ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetEditorialActivity.idActivity}</ListGroup.Item>
        <ListGroup.Item>Date de début : {props.targetEditorialActivity.editorialActivity.startDate}</ListGroup.Item>
        <ListGroup.Item>Date de fin : {props.targetEditorialActivity.editorialActivity.endDate}</ListGroup.Item>
        <ListGroup.Item>Facteur d'impact : {props.targetEditorialActivity.editorialActivity.impactFactor}</ListGroup.Item>
        <ListGroup.Item>Identifiant de journal : {props.targetEditorialActivity.editorialActivity.journal.journalId}</ListGroup.Item>
        <ListGroup.Item>Nom du journal : {props.targetEditorialActivity.editorialActivity.journal.journalName}</ListGroup.Item>

    </ListGroup> : "Target editorialActivity is not send as props!"


export default EditorialActivityElement