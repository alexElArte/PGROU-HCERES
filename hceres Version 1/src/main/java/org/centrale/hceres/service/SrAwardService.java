package org.centrale.hceres.service;

import java.text.ParseException;
import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.SrAward;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class SrAwardService {


    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getSrAwards() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.SR_AWARD.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteSrAward(final Integer id) {
        activityRepo.deleteById(id);
    }

    /**
 * permet d'ajouter un elmt
 *
 * @return : l'elemt ajoute a la base de donnees
 */
public Activity saveSrAward(@RequestBody Map<String, Object> request) throws RequestParseException {

    SrAward srAward = new SrAward();

    // SrAwardCourseName :
    srAward.setAwardeeName(RequestParser.getAsString(request.get("awardeeName")));

    // SrAwardCompletion :
    srAward.setAwardDate(RequestParser.getAsDate(request.get("awardDate")));

    // SrAwardDescription :
    srAward.setDescription(RequestParser.getAsString(request.get("description")));

    // Activity :
    Activity activity = new Activity();
    srAward.setActivity(activity);
    activity.setSrAward(srAward);
    activity.setIdTypeActivity(TypeActivityId.SR_AWARD.getId());

    // --- 🔽 nouvelle partie : gestion de plusieurs chercheurs ---
    Object researcherIdsObj = request.get("researcherIds");
    List<Researcher> researchers = new ArrayList<>();

    if (researcherIdsObj instanceof List<?>) {
        // cas normal : JSON: "researcherIds": [1,2,3]
        List<?> rawList = (List<?>) researcherIdsObj;
        for (Object o : rawList) {
            Integer id = RequestParser.getAsInteger(o); // ou cast direct si tu es sûre du type
            if (id != null) {
                researchers.add(new Researcher(id));
            }
        }
    } else if (researcherIdsObj != null) {
        // fallback au cas où on reçoit encore un seul id simple
        Integer id = RequestParser.getAsInteger(researcherIdsObj);
        if (id != null) {
            researchers.add(new Researcher(id));
        }
    }

    activity.setResearcherList(researchers);
    // --- 🔼 fin nouvelle partie ---

    activity = activityRepo.save(activity);
    return activity;
}

}













