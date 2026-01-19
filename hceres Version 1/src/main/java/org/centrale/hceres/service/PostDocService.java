package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.repository.PostDocRepository;

import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PostDocService {

    @Autowired
    private PostDocRepository postDocRepository;
    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getPostDocs() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.POST_DOC.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deletePostDoc(final Integer id) {
        postDocRepository.deleteById(id);
    }

    public Activity savePostDoc(@RequestBody Map<String, Object> request) throws RequestParseException {
    PostDoc postDocToSave = new PostDoc();

    // PostDocName :
    postDocToSave.setNamePostDoc(RequestParser.getAsString(request.get("postDocName")));

    // Arrival Date :
    postDocToSave.setArrivalDate(RequestParser.getAsDate(request.get("arrivalDate")));

    // Departure Date :
    postDocToSave.setDepartureDate(RequestParser.getAsDate(request.get("departureDate")));

    // Duration:
    postDocToSave.setDuration(RequestParser.getAsInteger(request.get("duration")));

    // Nationality:
    postDocToSave.setNationality(RequestParser.getAsString(request.get("nationality")));

    // Original Lab:
    postDocToSave.setOriginalLab(RequestParser.getAsString(request.get("originalLab")));

    // Associated Funding:
    postDocToSave.setAssociatedFunding(RequestParser.getAsString(request.get("associatedFunding")));

    // Associated Publication Ref:
    postDocToSave.setAssociatedPubliRef(RequestParser.getAsString(request.get("associatedPubliRef")));

    // Activity :
    Activity activity = new Activity();
    postDocToSave.setActivity(activity);
    activity.setPostDoc(postDocToSave);
    activity.setIdTypeActivity(TypeActivityId.POST_DOC.getId());

    // ==== multi-chercheurs (avec rétro-compat) ====
    List<Researcher> researchers = new ArrayList<>();

    Object researcherIdsObj = request.get("researcherIds");
    if (researcherIdsObj instanceof List<?>) {
        List<?> rawList = (List<?>) researcherIdsObj;
        for (Object o : rawList) {
            Integer id = RequestParser.getAsInteger(o);
            if (id != null) {
                researchers.add(new Researcher(id));
            }
        }
    }

    if (researchers.isEmpty()) {
        Object singleIdObj = request.get("researcherId");
        if (singleIdObj != null) {
            Integer id = RequestParser.getAsInteger(singleIdObj);
            if (id != null) {
                researchers.add(new Researcher(id));
            }
        }
    }

    activity.setResearcherList(researchers);
    // ==============================================

    activity = activityRepo.save(activity);
    return activity;
}

}
