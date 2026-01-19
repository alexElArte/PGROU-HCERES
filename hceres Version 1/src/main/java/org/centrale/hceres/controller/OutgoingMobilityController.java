package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.OutgoingMobility;
import org.centrale.hceres.service.OutgoingMobilityService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class OutgoingMobilityController {

    @Autowired
    private OutgoingMobilityService outgoingMobilityService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/OutgoingMobilities")
    public List<Activity> getOutgoingMobilities() {
        return outgoingMobilityService.getOutgoingMobilities();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/OutgoingMobility/Create")
    public Activity createOutgoingMobility(@RequestBody Map<String, Object> request) throws RequestParseException {
        return outgoingMobilityService.saveOutgoingMobility(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/OutgoingMobility/Delete/{id}")
    public void deleteOutgoingMobility(@RequestBody @PathVariable("id") final Integer id) {
        outgoingMobilityService.deleteOutgoingMobility(id);
    }
}
