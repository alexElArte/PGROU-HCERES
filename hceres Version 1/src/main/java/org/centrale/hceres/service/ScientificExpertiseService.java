package org.centrale.hceres.service;

import java.util.*;

import javax.transaction.Transactional;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ScientificExpertise;

import org.centrale.hceres.items.ScientificExpertiseType;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ScientificExpertiseTypeRepository;
import org.centrale.hceres.repository.ScientificExpertiseRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class ScientificExpertiseService {

    @Autowired
    private ScientificExpertiseRepository scientificExpertiseRepo;
    @Autowired
    private ScientificExpertiseTypeRepository scientificExpertiseTypeRepository;
    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getScientificExpertises() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.SCIENTIFIC_EXPERTISE.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteScientificExpertise(final Integer id) {
        scientificExpertiseRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
    public Activity saveScientificExpertise(@RequestBody Map<String, Object> request) throws RequestParseException {

        ScientificExpertise scientificExpertise = new ScientificExpertise();

        // setStartDate :
        scientificExpertise.setStartDate(RequestParser.getAsDate(request.get("ScientificExpertiseStartDate")));

        // setEndDate :
        scientificExpertise.setEndDate(RequestParser.getAsDate(request.get("ScientificExpertiseEndDate")));

        // setDescription :
        scientificExpertise.setDescription(RequestParser.getAsString(request.get("ScientificExpertiseDescription")));


        // ScientificExpertiseType :
        ScientificExpertiseType scientificExpertiseType = new ScientificExpertiseType();
        scientificExpertiseType.setNameChoice(RequestParser.getAsString(request.get("ScientificExpertiseTypeName")));
        scientificExpertise.setScientificExpertiseType(scientificExpertiseType);

        // Activity :
        Activity activity = new Activity();
        scientificExpertise.setActivity(activity);
        activity.setScientificExpertise(scientificExpertise);
        activity.setIdTypeActivity(TypeActivityId.SCIENTIFIC_EXPERTISE.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }

}



