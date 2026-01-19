package org.centrale.hceres.controller;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.service.OralComPosterService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class OralComPosterController {
		
	/**
	 * instanciation
	 */
	@Autowired
	private OralComPosterService communicationService;

	@GetMapping(value = "/OralComPosters")
	public List<Activity> getOralComPosters() {
		return communicationService.getOralComPosters();
	}

	/**
	 * ajouter un elmt a la base de donnees
	 * @return l'elmt ajoute
	 */
	@PostMapping(value = "/OralComPoster/Create")
	public Activity createOralComPoster(@RequestBody Map<String, Object> request)  throws RequestParseException {
		return communicationService.saveOralComPoster(request);
	}

	@DeleteMapping("/OralComPoster/Delete/{id}")

	public void deleteOralComPoster(@RequestBody @PathVariable("id") final Integer id) {
		communicationService.deleteOralComPoster(id);
	}
}
