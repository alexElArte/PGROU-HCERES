package org.centrale.hceres.controller;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Contract;
import org.centrale.hceres.service.ContractService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class ContractController {
    /**
     * instanciation
     */
    @Autowired
    private ContractService contraService;


    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/Contracts")
    public List<Contract> getContracts() {
        return contraService.getContracts();
    }

    @GetMapping(value = "/Contract/Researcher/{id}")
    public List<Contract> getContractsByResearcher(@PathVariable("id") final Integer id) {
        return contraService.getContractsByResearcher(id);
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/Contract/Create")
    public Contract createContract(@RequestBody Map<String, Object> request) throws RequestParseException {
        return contraService.saveContract(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/Contract/Delete/{id}")
    public void deleteContract(@RequestBody @PathVariable("id") final Integer id) {
        contraService.deleteContract(id);
    }
    
    
}
