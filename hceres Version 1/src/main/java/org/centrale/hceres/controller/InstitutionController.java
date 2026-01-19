package org.centrale.hceres.controller;

import org.centrale.hceres.items.Institution;
import org.centrale.hceres.service.InstitutionService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    @GetMapping("/Institutions")
    public List<Institution> getInstitutions() {
        return institutionService.getInstitutions();
    }
    /**
     * create a institution in database
     *
     * @return Institution
     */
    @PostMapping(value = "/Institution/Create")
    public Institution createInstitution(@RequestBody Map<String, Object> request) throws RequestParseException {
        return institutionService.saveInstitution(request);
    }

    /**
     * Delete - Delete a institution
     *
     * @param id - The id of the institution
     */
    @DeleteMapping("/Institution/Delete/{id}")
    public void deleteInstitution(@RequestBody @PathVariable("id") final Integer id) {
        institutionService.deleteInstitution(id);
    }
}
