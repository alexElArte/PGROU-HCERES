package org.centrale.hceres.service;

import lombok.Data;
import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.InternationalCollaborationRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Service
public class InternationalCollaborationService {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private InternationalCollaborationRepository internationalCollaborationRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getInternationalCollaborations() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.NATIONAL_INTERNATIONAL_COLLABORATION.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteInternationalCollaboration(final Integer id) {
        internationalCollaborationRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
    public Activity saveInternationalCollaboration(@RequestBody Map<String, Object> request)  throws RequestParseException {

        InternationalCollaboration internationalCollaboration = new InternationalCollaboration();

        // DateProjectStart :
        internationalCollaboration.setDateProjectStart(RequestParser.getAsDate(request.get("DateProjectStart")));

        // PartnerEntity :
        internationalCollaboration.setPartnerEntity(RequestParser.getAsString(request.get("PartnerEntity")));

        // CountryStateCity :
        internationalCollaboration.setCountryStateCity(RequestParser.getAsString(request.get("CountryStateCity")));

        // setPiPartners :
        internationalCollaboration.setPiPartners(RequestParser.getAsString(request.get("PiPartners")));

        // MailPartners
        internationalCollaboration.setMailPartners(RequestParser.getAsString(request.get("MailPartners")));

        // setProjectTitle
        internationalCollaboration.setProjectTitle(RequestParser.getAsString(request.get("ProjectTitle")));

        // StrategicRecurringCollab : probleme => boolean n'est pas de type bit
        internationalCollaboration.setStrategicRecurringCollab(Boolean.valueOf(RequestParser.getAsString(request.get("StrategicRecurringCollab"))));

        // ActiveProject
        internationalCollaboration.setActiveProject(Boolean.valueOf(RequestParser.getAsString(request.get("ActiveProject"))));

        // AssociatedFunding
        internationalCollaboration.setAssociatedFunding(RequestParser.getAsString(request.get("AssociatedFunding")));

        // NumberResultingPublications
        internationalCollaboration.setNumberResultingPublications(RequestParser.getAsInteger(request.get("NumberResultingPublications")));

        // RefJointPublication
        internationalCollaboration.setRefJointPublication(RequestParser.getAsString(request.get("RefJointPublication")));

        // UmrCoordinated
        internationalCollaboration.setUmrCoordinated(Boolean.valueOf(RequestParser.getAsString(request.get("UmrCoordinated"))));


        // AgreementSigned
        internationalCollaboration.setAgreementSigned(Boolean.valueOf(RequestParser.getAsString(request.get("AgreementSigned"))));


        // TypeCollab, TODO make a selection list in the front end and send the id
        internationalCollaboration.setTypeCollabId(1);

        // Activity :
        Activity activity = new Activity();
        internationalCollaboration.setActivity(activity);
        activity.setInternationalCollaboration(internationalCollaboration);
        activity.setIdTypeActivity(TypeActivityId.NATIONAL_INTERNATIONAL_COLLABORATION.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(RequestParser.getAsList(
                request.get("researcherIds")).stream()
                .map(resId -> new Researcher((Integer) resId))
                .collect(Collectors.toList()));

        activity = activityRepo.save(activity);
        return activity;
    }

}
