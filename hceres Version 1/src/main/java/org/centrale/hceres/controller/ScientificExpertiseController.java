package org.centrale.hceres.controller;

//import org.centrale.hceres.items.RequestDDO;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.service.ScientificExpertiseService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class ScientificExpertiseController {

    @Autowired
    private ScientificExpertiseService scientificExpertiseService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/ScientificExpertises")
    public List<Activity> getScientificExpertises() {
        return scientificExpertiseService.getScientificExpertises();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/ScientificExpertise/Create")
    public Activity createScientificExpertise(@RequestBody Map<String, Object> request) throws RequestParseException {
        return scientificExpertiseService.saveScientificExpertise(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/ScientificExpertise/Delete/{id}")

    public void deleteScientificExpertise(@RequestBody @PathVariable("id") final Integer id) {
        scientificExpertiseService.deleteScientificExpertise(id);
    }

}
