package org.centrale.hceres.controller;

import java.util.List;
import java.util.Map;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.service.ResearcherService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;


// Controller permet de receptionner la requete http depuis le client, envoyer cette requete a service pour la traiter, puis retouner la reponse
// la reponse sera sous format JSON (il s'agit d'une REST API)
@RestController
@CrossOrigin(originPatterns = "*")
public class ResearcherController {
	
	/**
	 * instanciation de ResearcherService
	 */
	@Autowired
	private ResearcherService rs;
	/**
	 * Instanciation de ResearcherRepository
	 */
	@Autowired
	private ResearcherRepository researcherRepo;
	
	/**
	 * pour une requete GET dans localhost/Researchers => fournir la liste des chercheurs
	 * le resultat est traduit automatiquement en JSON
	 * @return : liste des chercheurs
	 */
	@GetMapping("/Researchers")
	public List<Researcher> getResearchers() {
		return rs.getResearchers();
	}

	@GetMapping("/Researcher/{id}/Activities")
	public List<Activity> getResearcherActivity(@RequestBody @PathVariable("id") final Integer id) {
		return researcherRepo.findById(id).map(researcher -> {
			List<Activity> activities = researcher.getActivityList();
			for (Activity activity : activities) {
				// remove current researcher from researcher list to prevent redundant information of same researcher id
				activity.getResearcherList().removeIf(r -> r.getResearcherId().equals(researcher.getResearcherId()));
			}
			return researcher.getActivityList();
		}).orElse(null);
	}
	
	/**
	 * Delete - Delete an element
	 * @param id - The id of the element
	 */
	@DeleteMapping("/Researcher/Delete/{id}")
	public void deleteResearcher(@RequestBody @PathVariable("id") final Integer id) {
		rs.deleteResearcher(id);
	}

	/**
	 * ajouter un elmt a la base de donnees
	 * @param request : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@PostMapping(value ="/Researcher/Create")
	public Researcher createResearcher(@RequestBody Map<String, Object> request) throws RequestParseException {
		return rs.saveResearcher(request);
	}

	/**
	 * Update - Update an existing element
	 * @param id - The id of the element
	 * @param request - The element to update
	 * @return The updated element
	 */
	@PutMapping("/Researcher/Update/{id}")
	public Researcher updateResearcher(@PathVariable("id") final Integer id, @RequestBody Map<String, Object> request) throws RequestParseException {
		return rs.updateResearcher(id, request);
	}
}
