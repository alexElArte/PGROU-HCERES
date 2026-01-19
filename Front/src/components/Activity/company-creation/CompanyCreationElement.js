import {ListGroup} from "react-bootstrap";

const CompanyCreationElement = (props) =>
    props.targetCompanyCreation && props.targetCompanyCreation.companyCreation ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetCompanyCreation.idActivity}</ListGroup.Item>
        <ListGroup.Item>Name of the company : {props.targetCompanyCreation.companyCreation.companyCreationName}</ListGroup.Item>
        <ListGroup.Item>Creation Date : {props.targetCompanyCreation.companyCreation.companyCreationDate}</ListGroup.Item>
        <ListGroup.Item>Is the Company active? : {props.targetCompanyCreation.companyCreation.companyCreationActive?'True':'False'}</ListGroup.Item>
    </ListGroup> : "Target companyCreation is not send as props!"


export default CompanyCreationElement