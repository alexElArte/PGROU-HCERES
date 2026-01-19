package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.PublicationType;
import org.centrale.hceres.repository.PublicationTypeRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class PublicationTypeService {

    @Autowired
    private PublicationTypeRepository publicationTypeRepo;

    public List<PublicationType> getPublicationTypes() {
        return publicationTypeRepo.findAll();
    }
    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deletePublicationType(final Integer id) {
        publicationTypeRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public PublicationType savePublicationType(@RequestBody Map<String, Object> request) throws RequestParseException {

        PublicationType publicationType = new PublicationType();
        publicationType.setPublicationTypeName(RequestParser.getAsString(request.get("publicationTypeName")));
        publicationTypeRepo.save(publicationType);
        return publicationType;
    }

}
