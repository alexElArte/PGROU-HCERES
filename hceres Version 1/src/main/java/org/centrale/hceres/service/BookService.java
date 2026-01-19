package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Book;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.BookRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

@Data
@Service
public class BookService {

    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * Retourne la liste de toutes les activités de type "Book"
     */
    public List<Activity> getBooks() {
        // Type d'activité correct
        return activityRepo.findByIdTypeActivity(TypeActivityId.BOOK.getId());
    }

    /**
     * Supprime un livre selon son id d'activité
     */
    public void deleteBook(final Integer id) {
        bookRepo.deleteById(id);
    }

    /**
     * Ajoute un nouveau livre à la base
     */
    public Activity saveBook(@RequestBody Map<String, Object> request) throws RequestParseException {

        // --- Création de l'entité Book ---
        Book book = new Book();
        book.setTitle(RequestParser.getAsString(request.get("bookTitle")));
        book.setPublicationDate(RequestParser.getAsDate(request.get("bookPublicationDate")));
        book.setEditor(RequestParser.getAsString(request.get("bookEditor")));
        book.setNbPage(RequestParser.getAsInteger(request.get("bookNbPage")));
        book.setAuthors(RequestParser.getAsString(request.get("bookAuthors")));

        // languageId : simple conversion directe
        Integer languageId = RequestParser.getAsInteger(request.get("bookLanguageId"));
        book.setLanguageId(languageId);

        // --- Création de l'activité associée ---
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.BOOK.getId());

        // Association bidirectionnelle
        book.setActivity(activity);
        activity.setBook(book);

        // Lier le chercheur associé
        Integer researcherId = RequestParser.getAsInteger(request.get("researcherId"));
        if (researcherId != null) {
            activity.setResearcherList(Collections.singletonList(new Researcher(researcherId)));
        } else {
            activity.setResearcherList(Collections.emptyList());
        }

        // Sauvegarde dans la base
        activity = activityRepo.save(activity);
        return activity;
    }
}
