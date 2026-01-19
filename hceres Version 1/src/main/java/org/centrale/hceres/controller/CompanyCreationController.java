package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.CompanyCreation;
import org.centrale.hceres.service.CompanyCreationService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class CompanyCreationController {

    @Autowired
    private CompanyCreationService companyCreationService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/CompanyCreations")
    public List<Activity> getCompanyCreations() {
        return companyCreationService.getCompanyCreations();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/CompanyCreation/Create")
    public Activity createCompanyCreation(@RequestBody Map<String, Object> request) throws RequestParseException {
        return companyCreationService.saveCompanyCreation(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/CompanyCreation/Delete/{id}")
    public void deleteCompanyCreation(@RequestBody @PathVariable("id") final Integer id) {
        companyCreationService.deleteCompanyCreation(id);
    }
}
