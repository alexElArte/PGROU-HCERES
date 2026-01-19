package org.centrale.hceres.controller;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.service.TrainingThesisService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class TrainingThesisController {

    @Autowired
    private TrainingThesisService trainingThesisService;

    /**
     * Retourne la liste des activités de type TrainingThesis
     */
    @GetMapping("/TrainingTheses")
    public List<Activity> getTrainingTheses() {
        return trainingThesisService.getTrainingTheses();
    }

    /**
     * Crée une nouvelle TrainingThesis en base
     *
     * @return Activity créée
     */
    @PostMapping(value = "/TrainingThesis/Create")
    public Activity createTrainingThesis(@RequestBody Map<String, Object> request) throws RequestParseException {
        return trainingThesisService.saveTrainingThesis(request);
    }

    /**
     * Supprime une TrainingThesis
     *
     * @param id - id_activity de l’élément
     */
    @DeleteMapping("/TrainingThesis/Delete/{id}")
    public void deleteTrainingThesis(@RequestBody @PathVariable("id") final Integer id) {
        trainingThesisService.deleteTrainingThesis(id);
    }
}
