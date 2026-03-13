package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.service.NetworkService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class NetworkController {

    @Autowired
    NetworkService networkService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/Networks")
    public List<Activity> getNetwork() {
        return networkService.getNetworks();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/Network/Create")
    public Activity createNetwork(@RequestBody Map<String, Object> request) throws RequestParseException {
        return networkService.saveNetwork(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/Network/Delete/{id}")
    public void deleteNetwork(@RequestBody @PathVariable("id") final Integer id) {
        networkService.deleteNetwork(id);
    }
}
