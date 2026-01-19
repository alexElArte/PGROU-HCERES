package org.centrale.hceres.controller;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.SeiIndustrialRDContract;
import org.centrale.hceres.service.SeiIndustrialRDContractService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class SeiIndustrialRDContractController {

		
	/**
	 * instanciation
	 */
	@Autowired
	private SeiIndustrialRDContractService seiIndustrialRDContractService;

	/**
	 * return a list of activities of specified type only
	 */
	@GetMapping(value = "/IndustrialContracts")
	public List<Activity> getIndustrialContracts() {
		return seiIndustrialRDContractService.getIndustrialContracts();
	}

	/**
	 * create an element in database
	 *
	 * @return Activity
	 */
	@PostMapping(value = "/IndustrialContract/Create")
	public Activity createIndustrialContract(@RequestBody Map<String, Object> request) throws RequestParseException {
		return seiIndustrialRDContractService.saveIndustrialContract(request);
	}

	/**
	 * Delete - Delete an element
	 *
	 * @param id - The id of the element
	 */
	@DeleteMapping("/IndustrialContract/Delete/{id}")

	public void deleteIndustrialContract(@RequestBody @PathVariable("id") final Integer id) {
		seiIndustrialRDContractService.deleteIndustrialContract(id);
	}
}
