import {ListGroup} from "react-bootstrap";

const BookElement = (props) =>
    props.targetBook && props.targetBook.book ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetBook.idActivity}</ListGroup.Item>
            <ListGroup.Item>Titre : {props.targetBook.book.bookTitle}</ListGroup.Item>
            <ListGroup.Item>Date de publication : {props.targetBook.book.bookPublicationDate}</ListGroup.Item>
            <ListGroup.Item>Nom de l'éditeur : {props.targetBook.book.bookEditor}</ListGroup.Item>
            <ListGroup.Item>Nombre de pages : {props.targetBook.book.bookNbPage}</ListGroup.Item>
            <ListGroup.Item>nom de l'Auteur : {props.targetBook.book.bookAuthors}</ListGroup.Item>
            <ListGroup.Item>Language : {props.targetBook.book.bookLanguage}</ListGroup.Item>
    </ListGroup> : "Target book is not send as props!"


export default BookElement