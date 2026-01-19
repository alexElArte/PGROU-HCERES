package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.SeiClinicalTrial;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.SeiClinicalTrialRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class SeiClinicalTrialService {

    @Autowired
    private SeiClinicalTrialRepository seiClinicalTrialRepo;
    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getSeiClinicalTrials() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.SEI_CLINICAL_TRIAL.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteSeiClinicalTrial(final Integer id) {
        seiClinicalTrialRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Activity saveSeiClinicalTrial(@RequestBody Map<String, Object> request) throws RequestParseException {

        SeiClinicalTrial seiClinicalTrial = new SeiClinicalTrial();

        // setStartDate :
        seiClinicalTrial.setStartDate(RequestParser.getAsDate(request.get("startDate")));

        // setEndDate :
        seiClinicalTrial.setEndDate(RequestParser.getAsDate(request.get("endDate")));

        // setCoordinatorPartner :
        seiClinicalTrial.setCoordinatorPartner(RequestParser.getAsBoolean(request.get("coordinatorPartner")));

        // setTitleClinicalTrial :
        seiClinicalTrial.setTitleClinicalTrial(RequestParser.getAsString(request.get("titleClinicalTrial")));

        // setRegistrationNb :
        seiClinicalTrial.setRegistrationNb(RequestParser.getAsString(request.get("registrationNb")));

        // setSponsorName :
        seiClinicalTrial.setSponsorName(RequestParser.getAsString(request.get("sponsorName")));

        // setIncludedPatientsNb :
        seiClinicalTrial.setIncludedPatientsNb(RequestParser.getAsInteger(request.get("includedPatientsNb")));

        // setFunding :
        seiClinicalTrial.setFunding(RequestParser.getAsString(request.get("funding")));

        // setFundingAmount :
        seiClinicalTrial.setFundingAmount(RequestParser.getAsInteger(request.get("fundingAmount")));

        // Activity :
        Activity activity = new Activity();
        seiClinicalTrial.setActivity(activity);
        activity.setSeiClinicalTrial(seiClinicalTrial);
        activity.setIdTypeActivity(TypeActivityId.SEI_CLINICAL_TRIAL.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }

}
