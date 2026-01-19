package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;

@Service
public class ReviewService {
    @Autowired
    private ReviewArticleRepository ReviewArticleRepository;
    @Autowired
    private ResearcherRepository researchRepo;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private JournalRepository journalRepository;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getReviewArticle() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.REVIEWING_JOURNAL_ARTICLES.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteReviewArticle(final Integer id) {
        ReviewArticleRepository.deleteById(id);
    }

    @Transactional
    public Activity saveReviewArticle(@RequestBody Map<String, Object> request) throws RequestParseException {

        ReviewArticle reviewArticle = new ReviewArticle();

        // Year
        reviewArticle.setYear(RequestParser.getAsInteger(request.get("year")));

        // nb_reviewed_articles
        reviewArticle.setNbReviewedArticles(RequestParser.getAsInteger(request.get("nbReviewedArticles")));

        // impact_factor
        reviewArticle.setImpactFactor(new BigDecimal(RequestParser.getAsString(request.get("impactFactor"))));

        // Creating journal object with given name in form (must include in future the possibility to select among the existing journals)
        String journalName = RequestParser.getAsString(request.get("journalName"));

        Journal journal = journalRepository.findByName(journalName);
        if (journal == null) {
            journal = new Journal();
            journal.setJournalName(journalName);
            journal = journalRepository.save(journal);
            journalRepository.flush();
        }
        reviewArticle.setJournalId(journal.getJournalId());
        reviewArticle.setJournal(journal);

        // Activity :
        Activity activity = new Activity();
        reviewArticle.setActivity(activity);
        activity.setReviewArticle(reviewArticle);
        activity.setIdTypeActivity(TypeActivityId.REVIEWING_JOURNAL_ARTICLES.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }
}
