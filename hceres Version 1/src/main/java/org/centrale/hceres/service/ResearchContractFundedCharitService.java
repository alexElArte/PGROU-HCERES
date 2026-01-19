package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ResearchContractFundedCharit;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ResearchContractFundedCharitRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

@Data
@Service
public class ResearchContractFundedCharitService {

    @Autowired
    private ResearchContractFundedCharitRepository researchContractFundedCharitRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * Retourne la liste de toutes les activités de type
     * "ResearchContractFundedCharit"
     */
    public List<Activity> getResearchContractFundedCharits() {
        // Type d'activité correct
        return activityRepo.findByIdTypeActivity(TypeActivityId.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST.getId());
    }

    /**
     * Supprime un livre selon son id d'activité
     */
    public void deleteResearchContractFundedCharit(final Integer id) {
        researchContractFundedCharitRepo.deleteById(id);
    }

    /**
     * Ajoute un nouveau livre à la base
     */
    /**
     * Ajoute un nouveau contrat de recherche financé par un organisme
     * public/charitable
     */
    public Activity saveResearchContractFundedCharit(@RequestBody Map<String, Object> request)
        throws RequestParseException {

    // --- Création de l'entité ResearchContractFundedCharit ---
    ResearchContractFundedCharit contract = new ResearchContractFundedCharit();

    contract.setDateContractAward(
            RequestParser.getAsDate(request.get("dateContractAward")));
    contract.setFundingInstitution(
            RequestParser.getAsString(request.get("fundingInstitution")));
    contract.setProjectTitle(
            RequestParser.getAsString(request.get("projectTitle")));
    contract.setStartYear(
            RequestParser.getAsInteger(request.get("startYear")));
    contract.setEndYear(
            RequestParser.getAsInteger(request.get("endYear")));
    contract.setGrantAmount(
            RequestParser.getAsInteger(request.get("grantAmount")));

    Integer typeResearchContractId =
            RequestParser.getAsInteger(request.get("typeResearchContractId"));
    contract.setTypeResearchContractId(typeResearchContractId);

    // --- Création de l'activité associée ---
    Activity activity = new Activity();
    activity.setIdTypeActivity(
            TypeActivityId.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST.getId()
    );

    // Association bidirectionnelle
    contract.setActivity(activity);
    activity.setResearchContractFundedCharit(contract);

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

    // Sauvegarde dans la base
    activity = activityRepo.save(activity);
    return activity;
}


}
