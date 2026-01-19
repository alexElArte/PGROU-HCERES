import {ListGroup} from "react-bootstrap";

const PublicationElement = (props) =>
    props.targetPublication && props.targetPublication.publication ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetPublication.idActivity}</ListGroup.Item>
            <ListGroup.Item>Titre : {props.targetPublication.publication.publicationTitle}</ListGroup.Item>
            <ListGroup.Item>Date de publication : {props.targetPublication.publication.publicationPublicationDate}</ListGroup.Item>
            <ListGroup.Item>Source de la publication : {props.targetPublication.publication.publicationSource}</ListGroup.Item>
            <ListGroup.Item>Pmid de la publication : {props.targetPublication.publication.publicationPmid}</ListGroup.Item>
            <ListGroup.Item>nom de l'Auteur : {props.targetPublication.publication.publicationAuthors}</ListGroup.Item>
            <ListGroup.Item>Facteur d'impact : {props.targetPublication.publication.publicationImpactFactor}</ListGroup.Item>
            <ListGroup.Item>Type de la Publication : {props.targetPublication.publication.publicationType}</ListGroup.Item>
    </ListGroup> : "Target publication is not send as props!"


export default PublicationElement