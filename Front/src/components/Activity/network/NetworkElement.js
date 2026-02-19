import {ListGroup} from "react-bootstrap";

const NetworkElement = (props) =>
    props.targetNetwork && props.targetNetwork.network ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetNetwork.idActivity}</ListGroup.Item>
            <ListGroup.Item>Nom : {props.targetNetwork.network.nameNetwork}</ListGroup.Item>
            <ListGroup.Item>Date début : {props.targetNetwork.network.startDate}</ListGroup.Item>
            <ListGroup.Item>Active : {props.targetNetwork.network.activeNetwork}</ListGroup.Item>
            <ListGroup.Item>Financement associé : {props.targetNetwork.network.associatedFunding}</ListGroup.Item>
            <ListGroup.Item>Nombre de publications résultantes : {props.targetNetwork.network.nbResultingPublications}</ListGroup.Item>
            <ListGroup.Item>Référence de publications résultantes : {props.targetNetwork.network.refResultingPublications}</ListGroup.Item>
            <ListGroup.Item>Contact UMR : {props.targetNetwork.network.umrCoordinated}</ListGroup.Item>
            <ListGroup.Item>Accord signé : {props.targetNetwork.network.agreementSigned}</ListGroup.Item>
    </ListGroup> : "Target network is not send as props!"


export default NetworkElement