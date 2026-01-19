package org.centrale.hceres.controller;

import org.centrale.hceres.service.csv.DatabasePurger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(originPatterns = "*")
public class DataPurgerController {

    @Autowired
    private DatabasePurger databasePurger;

    @GetMapping(value = "/DataPurger/PurgeAll")
    public String purgeDatabase() {
        databasePurger.purgeData();
        return "done";
    }
}
