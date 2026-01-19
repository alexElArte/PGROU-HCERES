package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.PatentRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class PatentService {

    @Autowired
    private PatentRepository patentRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getPatents() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.PATENT_LICENCE_INVENTION_DISCLOSURE.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deletePatent(final Integer id) {
        patentRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Activity savePatent(@RequestBody Map<String, Object> request) throws RequestParseException {

        Patent patent = new Patent();
        patent.setTitle(RequestParser.getAsString(request.get("title")));
        patent.setRegistrationDate(RequestParser.getAsDate(request.get("registrationDate")));
        patent.setFilingDate(RequestParser.getAsDate(request.get("filingDate")));
        patent.setAcceptationDate(RequestParser.getAsDate(request.get("acceptationDate")));
        patent.setLicensingDate(RequestParser.getAsDate(request.get("licensingDate")));
        patent.setInventors(RequestParser.getAsString(request.get("inventors")));
        patent.setCoOwners(RequestParser.getAsString(request.get("coOwners")));
        patent.setPriorityNumber(RequestParser.getAsFloat(request.get("priorityNumber")));
        patent.setPriorityDate(RequestParser.getAsDate(request.get("priorityDate")));
        patent.setPublicationNumber(RequestParser.getAsString(request.get("publicationNumber")));
        patent.setPublicationDate(RequestParser.getAsDate(request.get("publicationDate")));
        patent.setInpiLink(RequestParser.getAsString(request.get("inpiLink")));
        patent.setStatus(RequestParser.getAsBoolean(request.get("status")));
        patent.setPctExtensionObtained(RequestParser.getAsBoolean(request.get("pctExtensionObtained")));
        patent.setPublicationNumberPctExtension(RequestParser.getAsString(request.get("publicationNumberPctExtension")));
        patent.setPublicationDatePctExtension(RequestParser.getAsDate(request.get("publicationDatePctExtension")));
        patent.setInternationalExtension(RequestParser.getAsBoolean(request.get("internationalExtension")));
        patent.setPublicationNumberInternationalExtension(RequestParser.getAsString(request.get("publicationNumberInternationalExtension")));
        patent.setPublicationDateInternationalExtension(RequestParser.getAsDate(request.get("publicationDateInternationalExtension")));
        patent.setRefTransferContract(RequestParser.getAsString(request.get("refTransferContract")));
        patent.setNameCompanyInvolved(RequestParser.getAsString(request.get("nameCompanyInvolved")));
        TypePatent typePatent = new TypePatent();
        typePatent.setNameChoice(RequestParser.getAsString(request.get("nameChoice")));
        patent.setTypePatentId(typePatent);

        // Activity :
        Activity activity = new Activity();
        patent.setActivity(activity);
        activity.setPatent(patent);
        activity.setIdTypeActivity(TypeActivityId.PATENT_LICENCE_INVENTION_DISCLOSURE.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }

}













