package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.SeiClinicalTrial;
import org.centrale.hceres.service.SeiClinicalTrialService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class SeiClinicalTrialController {

    @Autowired
    SeiClinicalTrialService SeiClinicalTrialService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/SeiClinicalTrials")
    public List<Activity> getSeiClinicalTrials() {
        return SeiClinicalTrialService.getSeiClinicalTrials();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/SeiClinicalTrial/Create")
    public Activity createSeiClinicalTrial(@RequestBody Map<String, Object> request) throws RequestParseException {
        return SeiClinicalTrialService.saveSeiClinicalTrial(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/SeiClinicalTrial/Delete/{id}")

    public void deleteSeiClinicalTrial(@RequestBody @PathVariable("id") final Integer id) {
        SeiClinicalTrialService.deleteSeiClinicalTrial(id);
    }
}

