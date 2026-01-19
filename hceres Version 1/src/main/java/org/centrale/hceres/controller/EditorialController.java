package org.centrale.hceres.controller;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.EditorialActivity;

import org.centrale.hceres.service.EditorialService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class EditorialController {

    @Autowired
    EditorialService editorialService;

    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/EditorialActivities")
    public List<Activity> getEditorialActivities() {
        return editorialService.getEditorialActivities();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/EditorialActivity/Create")
    public Activity createEditorialActivity(@RequestBody Map<String, Object> request) throws RequestParseException {
        return editorialService.saveEditorial(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/EditorialActivity/Delete/{id}")

    public void deleteEditorialActivity(@RequestBody @PathVariable("id") final Integer id) {
        editorialService.deleteEditorialActivity(id);
    }
}
