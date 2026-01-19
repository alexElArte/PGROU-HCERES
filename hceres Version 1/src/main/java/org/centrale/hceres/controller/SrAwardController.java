package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.SrAward;
import org.centrale.hceres.service.SrAwardService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class SrAwardController {

    @Autowired
    private SrAwardService srAwardService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/SrAwards")
    public List<Activity> getSrAwards() {
        return srAwardService.getSrAwards();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/SrAward/Create")
    public Activity createSrAward(@RequestBody Map<String, Object> request) throws RequestParseException {
        return srAwardService.saveSrAward(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/SrAward/Delete/{id}")
    public void deleteSrAward(@RequestBody @PathVariable("id") final Integer id) {
        srAwardService.deleteSrAward(id);
    }
}
