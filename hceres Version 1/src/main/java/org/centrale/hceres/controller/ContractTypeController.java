package org.centrale.hceres.controller;

import org.centrale.hceres.items.ContractType;
import org.centrale.hceres.service.ContractTypeService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class ContractTypeController {

    @Autowired
    private ContractTypeService contractTypeService;

    /**
     * return a list of contract types of specified type only
     */

    @GetMapping("/ContractTypes")
    public List<ContractType> getContractTypes() {
        return contractTypeService.getContractTypes();
    }
    /**
     * create a contract type in database
     *
     * @return ContractType
     */
    @PostMapping(value = "/ContractType/Create")
    public ContractType createContractType(@RequestBody Map<String, Object> request) throws RequestParseException {
        return contractTypeService.saveContractType(request);
    }

    /**
     * Delete - Delete a contract type
     *
     * @param id - The id of the contract type
     */
    @DeleteMapping("/ContractType/Delete/{id}")
    public void deleteContractType(@RequestBody @PathVariable("id") final Integer id) {
        contractTypeService.deleteContractType(id);
    }
}