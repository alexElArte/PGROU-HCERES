package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Institution;
import org.centrale.hceres.repository.InstitutionRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository institutionRepo;

    public List<Institution> getInstitutions() {
        return institutionRepo.findAll();
    }
    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteInstitution(final Integer id) {
        institutionRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Institution saveInstitution(@RequestBody Map<String, Object> request) throws RequestParseException {

        Institution institution = new Institution();
        institution.setInstitutionName(RequestParser.getAsString(request.get("institutionName")));
        institutionRepo.save(institution);
        return institution;
    }

}
