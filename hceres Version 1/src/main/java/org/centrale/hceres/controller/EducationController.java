package org.centrale.hceres.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Education;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.service.EducationService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// Controller permet de receptionner la requete http depuis le client, envoyer cette requete a service pour la traiter, puis retouner la reponse
// la reponse sera sous format JSON (il s'agit d'une REST API)
@RestController
@CrossOrigin(originPatterns = "*")
public class EducationController {

    /**
     * instanciation
     */
    @Autowired
    private EducationService eduService;


    /**
     * return a list of activities of specified type only
     */
    @GetMapping(value = "/Educations")
    public List<Activity> getEducations() {
        return eduService.getEducations();
    }

    /**
     * create an element in database
     *
     * @return Activity
     */
    @PostMapping(value = "/Education/Create")
    public Activity createEducation(@RequestBody Map<String, Object> request) throws RequestParseException {
        return eduService.saveEducation(request);
    }

    /**
     * Delete - Delete an element
     *
     * @param id - The id of the element
     */
    @DeleteMapping("/Education/Delete/{id}")

    public void deleteEducation(@RequestBody @PathVariable("id") final Integer id) {
        eduService.deleteEducation(id);
    }
}
