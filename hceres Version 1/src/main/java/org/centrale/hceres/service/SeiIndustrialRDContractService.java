package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.SeiIndustrialRDContract;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.SeiIndustrialRDContractRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;

import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestBody;

@Data
@Service
public class SeiIndustrialRDContractService {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private SeiIndustrialRDContractRepository seiIndustrialRDContractRepo;


    /**
     * permet de retourner la liste
     */
    public List<Activity> getIndustrialContracts() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.SEI_INDUSTRIAL_R_D_CONTRACT.getId());
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteIndustrialContract(final Integer id) {
        seiIndustrialRDContractRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
public Activity saveIndustrialContract(@RequestBody Map<String, Object> request) throws RequestParseException {

    SeiIndustrialRDContract seiIndustrialRDContract = new SeiIndustrialRDContract();

    // StartDate :
    seiIndustrialRDContract.setStartDate(RequestParser.getAsDate(request.get("StartDate")));

    // NameCompanyInvolved :
    seiIndustrialRDContract.setNameCompanyInvolved(RequestParser.getAsString(request.get("NameCompanyInvolved")));

    // ProjectTitle :
    seiIndustrialRDContract.setProjectTitle(RequestParser.getAsString(request.get("ProjectTitle")));

    // AgreementAmount :
    seiIndustrialRDContract.setAgreementAmount(RequestParser.getAsInteger(request.get("AgreementAmount")));

    // EndDate :
    seiIndustrialRDContract.setEndDate(RequestParser.getAsDate(request.get("EndDate")));

    // AssociatedPubliRef
    seiIndustrialRDContract.setAssociatedPubliRef(RequestParser.getAsString(request.get("AssociatedPubliRef")));

    // Activity :
    Activity activity = new Activity();
    seiIndustrialRDContract.setActivity(activity);
    activity.setSeiIndustrialRDContract(seiIndustrialRDContract);
    activity.setIdTypeActivity(TypeActivityId.SEI_INDUSTRIAL_R_D_CONTRACT.getId());

    // 🔽 Nouvelle partie : plusieurs chercheurs
    List<Researcher> researchers = new ArrayList<>();

    // 1) Nouveau front : "researcherIds": [1,2,3]
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

    // 2) Compatibilité : ancien front "researcherId": 1
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
    // 🔼 Fin nouvelle partie

    activity = activityRepo.save(activity);
    return activity;
}


}
