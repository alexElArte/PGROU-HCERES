package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.IncomingMobility;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.IncomingMobilityRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class IncomingMobilityService {

    @Autowired
    private IncomingMobilityRepository incomingMobilityRepo;
    @Autowired
    private ActivityRepository activityRepo;


    /**
     * permet de retourner la liste
     */
    public List<Activity> getIncomingMobilities() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.INCOMING_MOBILITY.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteIncomingMobility(final Integer id) {
        incomingMobilityRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Activity saveIncomingMobility(@RequestBody Map<String, Object> request) throws RequestParseException {
        IncomingMobility incomingMobility = new IncomingMobility();

        // setNameSeniorScientist :
        incomingMobility.setNameSeniorScientist(RequestParser.getAsString(request.get("nameSeniorScientist")));

        // setArrivalDate :
        incomingMobility.setArrivalDate(RequestParser.getAsDate(request.get("arrivalDate")));

        // setArrivalDate :
        incomingMobility.setDepartureDate(RequestParser.getAsDate(request.get("departureDate")));

        // setDuration :
        incomingMobility.setDuration(RequestParser.getAsInteger(request.get("duration")));

        // setNationality :
        incomingMobility.setNationality(RequestParser.getAsString(request.get("nationality")));

        // setOriginalLabName :
        incomingMobility.setOriginalLabName(RequestParser.getAsString(request.get("originalLabName")));

        // setOriginaLabLocation :
        incomingMobility.setOriginaLabLocation(RequestParser.getAsString(request.get("originaLabLocation")));

        // setPiPartner :
        incomingMobility.setPiPartner(RequestParser.getAsString(request.get("piPartner")));

        // setProjectTitle :
        incomingMobility.setProjectTitle(RequestParser.getAsString(request.get("projectTitle")));

        // setAssociatedFunding :
        incomingMobility.setAssociatedFunding(RequestParser.getAsString(request.get("associatedFunding")));

        // setPublicationReference :
        incomingMobility.setPublicationReference(RequestParser.getAsString(request.get("publicationReference")));

        // setStrategicRecurringCollab :
        incomingMobility.setStrategicRecurringCollab(RequestParser.getAsBoolean(request.get("strategicRecurringCollab")));

        // setActiveProject :
        incomingMobility.setActiveProject(RequestParser.getAsBoolean(request.get("activeProject")));

        // setUmrCoordinated :
        incomingMobility.setUmrCoordinated(RequestParser.getAsBoolean(request.get("umrCoordinated")));

        // setAgreementSigned :
        incomingMobility.setAgreementSigned(RequestParser.getAsBoolean(request.get("agreementSigned")));

        // Activity :
        Activity activity = new Activity();
        incomingMobility.setActivity(activity);
        activity.setIncomingMobility(incomingMobility);
        activity.setIdTypeActivity(TypeActivityId.INCOMING_MOBILITY.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }

}

