package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.service.IncomingMobilityService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class IncomingMobilityController {

    @Autowired
    IncomingMobilityService incomingMobilityService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/IncomingMobilities")
    public List<Activity> getIncomingMobilities() {
        return incomingMobilityService.getIncomingMobilities();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/IncomingMobility/Create")
    public Activity createIncomingMobility(@RequestBody Map<String, Object> request) throws RequestParseException {
        return incomingMobilityService.saveIncomingMobility(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/IncomingMobility/Delete/{id}")

    public void deleteIncomingMobility(@RequestBody @PathVariable("id") final Integer id) {
        incomingMobilityService.deleteIncomingMobility(id);
    }
}
