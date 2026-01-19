package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Patent;
import org.centrale.hceres.service.PatentService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class PatentController {

    @Autowired
    private PatentService patentService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/Patents")
    public List<Activity> getPatents() {
        return patentService.getPatents();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/Patent/Create")
    public Activity createPatent(@RequestBody Map<String, Object> request) throws RequestParseException {
        return patentService.savePatent(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/Patent/Delete/{id}")
    public void deletePatent(@RequestBody @PathVariable("id") final Integer id) {
        patentService.deletePatent(id);
    }
}
