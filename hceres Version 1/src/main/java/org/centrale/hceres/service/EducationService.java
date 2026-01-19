package org.centrale.hceres.service;

import java.util.*;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Education;
import org.centrale.hceres.items.EducationInvolvement;
import org.centrale.hceres.items.EducationLevel;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.EducationInvolvementRespository;
import org.centrale.hceres.repository.EducationLevelRepository;
import org.centrale.hceres.repository.EducationRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.Data;

import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestBody;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepo;

    @Autowired
    private EducationInvolvementRespository educationInvolvementRepo;

    @Autowired
    private EducationLevelRepository educationLevelRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getEducations() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.EDUCATIONAL_OUTPUT.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteEducation(final Integer id) {
        educationRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
    public Activity saveEducation(@RequestBody Map<String, Object> request) throws RequestParseException {

        Education education = new Education();

        // EducationCourseName :
        education.setEducationCourseName(RequestParser.getAsString(request.get("educationCourseName")));

        // EducationCompletion :
        education.setEducationCompletion(RequestParser.getAsDate(request.get("educationCompletion")));

        // EducationDescription :
        education.setEducationDescription(RequestParser.getAsString(request.get("educationDescription")));

        // EducationFormation :
        education.setEducationFormation(RequestParser.getAsString(request.get("educationFormation")));


        // EducationInvolvement
        EducationInvolvement educationInvolvement = new EducationInvolvement();
        educationInvolvement.setEducationInvolvementName(RequestParser.getAsString(request.get("educationInvolvementName")));
        education.setEducationInvolvementId(educationInvolvement);


        // EducationLevel :
        EducationLevel educationLevel = new EducationLevel();
        educationLevel.setEducationLevelName(RequestParser.getAsString(request.get("educationLevelText")));
        education.setEducationLevelId(educationLevel);

        // Activity :
        Activity activity = new Activity();
        education.setActivity(activity);
        activity.setEducation(education);
        activity.setIdTypeActivity(TypeActivityId.EDUCATION_FORMATION.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }
}












