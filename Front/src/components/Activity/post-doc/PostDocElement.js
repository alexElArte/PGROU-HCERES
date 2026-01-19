import {ListGroup} from "react-bootstrap";

const PostDocElement = (props) =>
    props.targetPostDoc && props.targetPostDoc.postDoc ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetPostDoc.idActivity}</ListGroup.Item>
        <ListGroup.Item>Name of the Post-docs  : {props.targetPostDoc.postDoc.namePostDoc}</ListGroup.Item>
        <ListGroup.Item>Supervisor Name : {props.targetPostDoc.postDoc.nameSupervisor}</ListGroup.Item>
        <ListGroup.Item>Arrival Date : {props.targetPostDoc.postDoc.arrivalDate}</ListGroup.Item>
        <ListGroup.Item>Departure Date : {props.targetPostDoc.postDoc.departureDate}</ListGroup.Item>
        <ListGroup.Item>Duration : {props.targetPostDoc.postDoc.duration}</ListGroup.Item>
        <ListGroup.Item>Nationality : {props.targetPostDoc.postDoc.nationality}</ListGroup.Item>
        <ListGroup.Item> Original Laboritory : {props.targetPostDoc.postDoc.originalLab}</ListGroup.Item>
        <ListGroup.Item>Associated Funding : {props.targetPostDoc.postDoc.associatedFunding}</ListGroup.Item>
        <ListGroup.Item>Associated Publication references : {props.targetPostDoc.postDoc.associatedPubliRef}</ListGroup.Item>
    </ListGroup> : "Target postDoc is not send as props!"


export default PostDocElement