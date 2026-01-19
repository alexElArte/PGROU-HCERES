package org.centrale.hceres.service;

import lombok.Data;
import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.ContractRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Data
@Service
public class ContractService {

    @Autowired
    private ContractRepository contraRepo;

    /**
     * permet de retourner la liste
     */
    public List<Contract> getContracts() {
        return contraRepo.findAll();
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteContract(final Integer id) {
        contraRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouté a la base de donnees
     */
    @Transactional
    public Contract saveContract(@RequestBody Map<String, Object> request) throws RequestParseException {

        Contract contract = new Contract();

        // StartContract :
        contract.setStartContract(RequestParser.getAsDate(request.get("startContract")));

        // EndContract :
        contract.setEndContract(RequestParser.getAsDate(request.get("endContract")));

        // FunctionContract :
        contract.setFunctionContract(RequestParser.getAsString(request.get("functionContract")));

        // ContractType
        contract.setContractTypeId(RequestParser.getAsInteger(request.get("contractTypeId")));

        // Employer :
        Employer employer = new Employer();
        employer.setNameEmployer(RequestParser.getAsString(request.get("nameEmployer")));
        contract.setEmployer(employer);

        // Researcher :
        contract.setResearcherId(RequestParser.getAsInteger(request.get("researcherId")));

        // Status :
        contract.setStatusId(RequestParser.getAsInteger(request.get("statusId")));


        contract.setResearcherId(RequestParser.getAsInteger(request.get("researcherId")));
        contract = contraRepo.save(contract);
        return contract;
    }

    public List<Contract> getContractsByResearcher(Integer id) {
        return contraRepo.getContractsByResearcher(id);
    }
}
