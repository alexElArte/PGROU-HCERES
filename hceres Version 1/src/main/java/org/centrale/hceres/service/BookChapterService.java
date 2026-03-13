package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Book;
import org.centrale.hceres.items.BookChapter;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.BookChapterRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

@Data
@Service
public class BookChapterService {

    @Autowired
    private BookChapterRepository bookChapterRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * Retourne la liste de toutes les activités de type "BookChapter"
     */
    public List<Activity> getBookChapters() {
        Integer targetId = TypeActivityId.BOOK_CHAPTER.getId();
        System.out.println("Recherche d'activités pour l'ID type : " + targetId);
        
        List<Activity> results = activityRepo.findByIdTypeActivity(targetId);
        
        System.out.println("Nombre d'activités trouvées en base : " + results.size());
        return results;

        // return activityRepo.findByIdTypeActivity(TypeActivityId.BOOK_CHAPTER.getId());
    }

    /**
     * Supprime un chapitre de livre selon son id d'activité
     */
    public void deleteBookChapter(final Integer id) {
        bookChapterRepo.deleteById(id);
    }

    /**
     * Ajoute un nouveau livre à la base
     */
    public Activity saveBookChapter(@RequestBody Map<String, Object> request) throws RequestParseException {

        // --- Création de l'entité BookChapter ---
        BookChapter bookChapter = new BookChapter();
        bookChapter.setChapterTitle(RequestParser.getAsString(request.get("chapterTitle")));
        bookChapter.setBookTitle(RequestParser.getAsString(request.get("bookTitle")));
        bookChapter.setPublicationDate(RequestParser.getAsDate(request.get("bookChapterPublicationDate")));
        bookChapter.setEditor(RequestParser.getAsString(request.get("bookChapterEditor")));
        bookChapter.setNbPage(RequestParser.getAsInteger(request.get("bookChapterNbPage")));
        bookChapter.setAuthors(RequestParser.getAsString(request.get("bookChapterAuthors")));
        bookChapter.setAdditionalInfo(RequestParser.getAsString(request.get("bookChapterAdditionalInfo")));

        // languageId : simple conversion directe
        Integer languageId = RequestParser.getAsInteger(request.get("bookChapterLanguageId"));
        bookChapter.setLanguageId(languageId);

        // --- Création de l'activité associée ---
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.BOOK_CHAPTER.getId());

        // Association bidirectionnelle
        bookChapter.setActivity(activity);
        activity.setBookChapter(bookChapter);

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
