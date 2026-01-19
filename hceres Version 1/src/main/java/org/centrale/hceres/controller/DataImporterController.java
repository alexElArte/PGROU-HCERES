package org.centrale.hceres.controller;

import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.service.csv.DataImporterService;
import org.centrale.hceres.service.csv.util.CsvTemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
public class DataImporterController {

    @Autowired
    private DataImporterService dataImporterService;

    /**
     * Import data present in csv files sent
     *
     * @return ImportCsvResults
     */
    @PostMapping(value = "/DataImporter/Import/CsvResults")
    public ImportCsvSummary importCsvData(@RequestBody Map<String, Object> request)
            throws CsvTemplateException {
        return dataImporterService.importCsvData(request);
    }
}
