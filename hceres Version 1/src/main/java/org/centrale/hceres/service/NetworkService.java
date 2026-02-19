package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Network;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.NetworkRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

@Data
@Service
public class NetworkService {

    @Autowired
    private NetworkRepository networkRepo;

    @Autowired
    private ActivityRepository activityRepo;

    /**
     * Retourne la liste de toutes les activités de type "Network"
     */
    public List<Activity> getNetworks() {
        // Type d'activité correct
        return activityRepo.findByIdTypeActivity(TypeActivityId.NETWORK.getId());
    }

    /**
     * Supprime un réseau selon son id d'activité
     */
    public void deleteNetwork(final Integer id) {
        networkRepo.deleteById(id);
    }

    /**
     * Ajoute un nouveau réseau à la base
     */
    public Activity saveNetwork(@RequestBody Map<String, Object> request) throws RequestParseException {

        // --- Création de l'entité Network ---
        Network network = new Network();

        network.setStartDate(RequestParser.getAsDate(request.get("startDate")));
        network.setNameNetwork(RequestParser.getAsString(request.get("nameNetwork")));
        network.setActiveNetwork(RequestParser.getAsBoolean(request.get("activeNetwork")));
        network.setAssociatedFunding(RequestParser.getAsString(request.get("associatedFunding")));
        network.setNbResultingPublications(RequestParser.getAsInteger(request.get("nbResultingPublications")));
        network.setRefResultingPublications(RequestParser.getAsString(request.get("refResultingPublications")));
        network.setUmrCoordinated(RequestParser.getAsBoolean(request.get("umrCoordinated")));
        network.setAgreementSigned(RequestParser.getAsBoolean(request.get("agreementSigned")));

        // --- Création de l'activité associée ---
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.NETWORK.getId());

        // Association bidirectionnelle
        network.setActivity(activity);
        activity.setNetwork(network);

        // Lier le chercheur associé
        Integer researcherId = RequestParser.getAsInteger(request.get("researcherId"));
        if (researcherId != null) {
            activity.setResearcherList(Collections.singletonList(new Researcher(researcherId)));
        } else {
            activity.setResearcherList(Collections.emptyList());
        }

        // Sauvegarde dans la base
        activity = activityRepo.save(activity);
        return activity;
    }
}
