package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.*;

@Service
public class EditorialService {
    @Autowired
    EditorialRepository editorialRepository;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private JournalRepository journalRepository;
    @Autowired
    private FunctionEditorialActivityRepository functionEditorialActivityRepository;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getEditorialActivities() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.EDITORIAL_ACTIVITY.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteEditorialActivity(final Integer id) {
        editorialRepository.deleteById(id);
    }

    public Activity saveEditorial(@RequestBody Map<String, Object> request) throws RequestParseException {

        EditorialActivity editorial = new EditorialActivity();

        // Start Date
        editorial.setStartDate(RequestParser.getAsDate(request.get("startDate")));

        // Start Date
        editorial.setEndDate(RequestParser.getAsDate(request.get("endDate")));

        // Impact Factor
        String impactFactor = RequestParser.getAsString(request.get("impactFactor"));
        BigDecimal impactFactorInt = new BigDecimal(impactFactor);
        editorial.setImpactFactor(impactFactorInt);

        // Activity :
        Activity activity = new Activity();
        editorial.setActivity(activity);
        activity.setEditorialActivity(editorial);
        activity.setIdTypeActivity(TypeActivityId.EDITORIAL_ACTIVITY.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        // Creating journal object with given name in form (must include in future the possibility to select among the existing journals)
        String journalName = RequestParser.getAsString(request.get("journalName"));

        Journal journal = journalRepository.findByName(journalName);
        if (journal == null) {
            journal = new Journal();
            journal.setJournalName(journalName);
        }
        editorial.setJournal(journal);


        // Creating an editing function
        // Search in dataBase by function name if it doesn't exist create It
        String functionName = RequestParser.getAsString(request.get("functionName"));
        FunctionEditorialActivity functionEditorialActivity = functionEditorialActivityRepository.findByName(functionName);
        if (functionEditorialActivity == null) {
            functionEditorialActivity = new FunctionEditorialActivity();
            // Setting the function Name
            functionEditorialActivity.setFunctionEditorialActivityName(functionName);
        }
        editorial.setFunctionEditorialActivity(functionEditorialActivity);

        activity = activityRepo.save(activity);

        return activity;
    }
}
