import {ListGroup} from "react-bootstrap";

const ResearcherElement = (props) =>
    props.targetResearcher ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetResearcher.researcherId}</ListGroup.Item>
        <ListGroup.Item>Surname : {props.targetResearcher.researcherSurname}</ListGroup.Item>
        <ListGroup.Item>Name : {props.targetResearcher.researcherName}</ListGroup.Item>
    </ListGroup> : "Target researcher is not send as props!"


export default ResearcherElement