package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Status;
import org.centrale.hceres.repository.StatusRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepo;

    public List<Status> getStatutes() {
        return statusRepo.findAll();
    }
    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteStatus(final Integer id) {
        statusRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouté à la base de donnees
     */
    public Status saveStatus(@RequestBody Map<String, Object> request) throws RequestParseException {

        Status status = new Status();
        status.setStatusName(RequestParser.getAsString(request.get("statusName")));
        statusRepo.save(status);
        return status;
    }

}
