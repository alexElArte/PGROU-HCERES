package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.repository.LaboratoryRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class LaboratoryService {

    @Autowired
    private LaboratoryRepository laboratoryRepo;

    public List<Laboratory> getLaboratories() {
        return laboratoryRepo.findAll();
    }
    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteLaboratory(final Integer id) {
        laboratoryRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Laboratory saveLaboratory(@RequestBody Map<String, Object> request) throws RequestParseException {

        Laboratory laboratory = new Laboratory();
        laboratory.setLaboratoryName(RequestParser.getAsString(request.get("laboratoryName")));
        laboratory.setLaboratoryAcronym(RequestParser.getAsString(request.get("laboratoryAcronym")));
        laboratory.setInstitutionId(RequestParser.getAsInteger(request.get("institutionId")));

        laboratoryRepo.save(laboratory);
        return laboratory;
    }
}
