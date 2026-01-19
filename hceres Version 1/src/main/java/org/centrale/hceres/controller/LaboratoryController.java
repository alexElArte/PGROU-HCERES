package org.centrale.hceres.controller;

import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.service.LaboratoryService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class LaboratoryController {

    @Autowired
    private LaboratoryService laboratoryService;

    @GetMapping("/Laboratories")
    public List<Laboratory> getLaboratories() {
        return laboratoryService.getLaboratories();
    }
    /**
     * create a laboratory in database
     *
     * @return Laboratory
     */
    @PostMapping(value = "/Laboratory/Create")
    public Laboratory createLaboratory(@RequestBody Map<String, Object> request) throws RequestParseException {
        return laboratoryService.saveLaboratory(request);
    }

    /**
     * Delete - Delete a laboratory
     *
     * @param id - The id of the laboratory
     */
    @DeleteMapping("/Laboratory/Delete/{id}")
    public void deleteLaboratory(@RequestBody @PathVariable("id") final Integer id) {
        laboratoryService.deleteLaboratory(id);
    }
}
