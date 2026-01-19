package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.OutgoingMobility;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.OutgoingMobilityRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class OutgoingMobilityService {

    @Autowired
    private OutgoingMobilityRepository outgoingMobilityRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getOutgoingMobilities() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.OUTGOING_MOBILITY.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteOutgoingMobility(final Integer id) {
        outgoingMobilityRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Activity saveOutgoingMobility(@RequestBody Map<String, Object> request) throws RequestParseException {

        OutgoingMobility outgoingMobility = new OutgoingMobility();
        outgoingMobility.setNamePersonConcerned(RequestParser.getAsString(request.get("namePersonConcerned")));
        outgoingMobility.setArrivalDate(RequestParser.getAsDate(request.get("arrivalDate")));
        outgoingMobility.setDepartureDate(RequestParser.getAsDate(request.get("departureDate")));
        outgoingMobility.setDuration(RequestParser.getAsInteger(request.get("duration")));
        outgoingMobility.setHostLabName(RequestParser.getAsString(request.get("hostLabName")));
        outgoingMobility.setHostLabLocation(RequestParser.getAsString(request.get("hostLabLocation")));
        outgoingMobility.setPiPartner(RequestParser.getAsString(request.get("piPartner")));
        outgoingMobility.setProjectTitle(RequestParser.getAsString(request.get("projectTitle")));
        outgoingMobility.setAssociatedFunding(RequestParser.getAsString(request.get("associatedFunding")));
        outgoingMobility.setNbPublications(RequestParser.getAsInteger(request.get("nbPublications")));
        outgoingMobility.setPublicationReference(RequestParser.getAsString(request.get("publicationReference")));
        outgoingMobility.setStrategicRecurringCollab(RequestParser.getAsBoolean(request.get("strategicRecurringCollab")));
        outgoingMobility.setActiveProject(RequestParser.getAsBoolean(request.get("activeProject")));
        outgoingMobility.setUmrCoordinated(RequestParser.getAsBoolean(request.get("umrCoordinated")));
        outgoingMobility.setAgreementSigned(RequestParser.getAsBoolean(request.get("agreementSigned")));

        // Activity :
        Activity activity = new Activity();
        outgoingMobility.setActivity(activity);
        activity.setOutgoingMobility(outgoingMobility);
        activity.setIdTypeActivity(TypeActivityId.OUTGOING_MOBILITY.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }

}













