package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ResearchContractFundedCharit;
import org.centrale.hceres.service.ResearchContractFundedCharitService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class ResearchContractFundedCharitController {

    @Autowired
    ResearchContractFundedCharitService researchContractFundedCharitService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/ResearchContractFundedCharits")
    public List<Activity> getResearchContractFundedCharit() {
        return researchContractFundedCharitService.getResearchContractFundedCharits();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/ResearchContractFundedCharit/Create")
    public Activity createResearchContractFundedCharit(@RequestBody Map<String, Object> request) throws RequestParseException {
        return researchContractFundedCharitService.saveResearchContractFundedCharit(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/ResearchContractFundedCharit/Delete/{id}")
    public void deleteResearchContractFundedCharit(@RequestBody @PathVariable("id") final Integer id) {
        researchContractFundedCharitService.deleteResearchContractFundedCharit(id);
    }
}
