package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.ContractType;
import org.centrale.hceres.repository.ContractTypeRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class ContractTypeService {

    @Autowired
    private ContractTypeRepository contractTypeRepo;

    public List<ContractType> getContractTypes() {
        return contractTypeRepo.findAll();
    }
    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteContractType(final Integer id) {
        contractTypeRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouté à la base de donnees
     */
    public ContractType saveContractType(@RequestBody Map<String, Object> request) throws RequestParseException {

        ContractType contractType = new ContractType();
        contractType.setContractTypeName(RequestParser.getAsString(request.get("contractTypeName")));

        contractTypeRepo.save(contractType);
        return contractType;
    }

}