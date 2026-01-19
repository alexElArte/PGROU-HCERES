package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.InternationalCollaboration;
import org.centrale.hceres.service.InternationalCollaborationService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class InternationalCollaborationController {

	/**
	 * instanciation
	 */
	@Autowired
	private InternationalCollaborationService internationalCollaborationService;


	/**
	 * return a list of activities of specified type only
	 */
	@GetMapping(value = "/InternationalCollaborations")
	public List<Activity> getInternationalCollaborations() {
		return internationalCollaborationService.getInternationalCollaborations();
	}

	/**
	 * create an element in database
	 *
	 * @return Activity
	 */
	@PostMapping(value = "/InternationalCollaboration/Create")
	public Activity createInternationalCollaboration(@RequestBody Map<String, Object> request)  throws RequestParseException {
		return internationalCollaborationService.saveInternationalCollaboration(request);
	}

	/**
	 * Delete - Delete an element
	 *
	 * @param id - The id of the element
	 */
	@DeleteMapping("/InternationalCollaboration/Delete/{id}")

	public void deleteInternationalCollaboration(@RequestBody @PathVariable("id") final Integer id) {
		internationalCollaborationService.deleteInternationalCollaboration(id);
	}
}
