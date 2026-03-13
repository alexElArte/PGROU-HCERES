import {ListGroup} from "react-bootstrap";

const BookChapterElement = (props) =>
    props.targetBookChapter && props.targetBookChapter.bookChapter ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetBookChapter.idActivity}</ListGroup.Item>
            <ListGroup.Item>Titre : {props.targetBookChapter.bookChapter.chapterTitle}</ListGroup.Item>
            <ListGroup.Item>Titre du livre : {props.targetBookChapter.bookChapter.bookTitle}</ListGroup.Item>
            <ListGroup.Item>Date de publication : {props.targetBookChapter.bookChapter.publicationDate}</ListGroup.Item>
            <ListGroup.Item>Nom de l'éditeur : {props.targetBookChapter.bookChapter.editor}</ListGroup.Item>
            <ListGroup.Item>Nombre de pages : {props.targetBookChapter.bookChapter.nbPage}</ListGroup.Item>
            <ListGroup.Item>Nom de l'Auteur : {props.targetBookChapter.bookChapter.authors}</ListGroup.Item>
            <ListGroup.Item>Informations supplémentaires : {props.targetBookChapter.bookChapter.additionalInfo}</ListGroup.Item>
            <ListGroup.Item>Language : {props.targetBookChapter.bookChapter.language.languageName}</ListGroup.Item>
    </ListGroup> : "Target book is not send as props!"


export default BookChapterElement