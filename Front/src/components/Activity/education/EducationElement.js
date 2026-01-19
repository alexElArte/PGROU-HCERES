import {ListGroup} from "react-bootstrap";

const EducationElement = (props) =>
    props.targetEducation && props.targetEducation.education ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetEducation.idActivity}</ListGroup.Item>
        <ListGroup.Item>Nom : {props.targetEducation.education.educationCourseName}</ListGroup.Item>
        <ListGroup.Item>Description : {props.targetEducation.education.educationDescription}</ListGroup.Item>
        <ListGroup.Item>Formation : {props.targetEducation.education.educationFormation}</ListGroup.Item>
        <ListGroup.Item>Completetion : {props.targetEducation.education.educationCompletion}</ListGroup.Item>
    </ListGroup> : "Target education is not send as props!"


export default EducationElement