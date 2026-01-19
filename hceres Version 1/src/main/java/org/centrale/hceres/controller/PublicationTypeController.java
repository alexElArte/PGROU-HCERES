package org.centrale.hceres.controller;

import org.centrale.hceres.items.PublicationType;
import org.centrale.hceres.service.PublicationTypeService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class PublicationTypeController {

    @Autowired
    private PublicationTypeService publicationTypeService;

    @GetMapping("/PublicationTypes")
    public List<PublicationType> getPublicationTypes() {
        return publicationTypeService.getPublicationTypes();
    }
    /**
     * create a publicationType in database
     *
     * @return PublicationType
     */
    @PostMapping(value = "/PublicationType/Create")
    public PublicationType createPublicationType(@RequestBody Map<String, Object> request) throws RequestParseException {
        return publicationTypeService.savePublicationType(request);
    }

    /**
     * Delete - Delete a publicationType
     *
     * @param id - The id of the publicationType
     */
    @DeleteMapping("/PublicationType/Delete/{id}")
    public void deletePublicationType(@RequestBody @PathVariable("id") final Integer id) {
        publicationTypeService.deletePublicationType(id);
    }
}
