package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Publication;
import org.centrale.hceres.service.PublicationService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping("/Publications")
    public List<Activity> getPublications() {
        return publicationService.getPublications();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/Publication/Create")
    public Activity createPublication(@RequestBody Map<String, Object> request) throws RequestParseException {
        return publicationService.savePublication(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/Publication/Delete/{id}")
    public void deletePublication(@RequestBody @PathVariable("id") final Integer id) {
        publicationService.deletePublication(id);
    }
}
