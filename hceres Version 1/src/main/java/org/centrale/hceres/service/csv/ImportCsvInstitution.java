package org.centrale.hceres.service.csv;


import org.centrale.hceres.dto.csv.CsvInstitution;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Institution;
import org.centrale.hceres.repository.InstitutionRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImportCsvInstitution {

    @Autowired
    private InstitutionRepository institutionRepository;

    /**
     * @param csvRows          List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvInstitution}
     */
    public Map<Integer, GenericCsv<Institution, Integer>> importCsvList(List<?> csvRows, ImportCsvSummary importCsvSummary) {
        return new GenericCsvImporter<Institution, Integer>()
                .importCsvList(csvRows,
                        CsvInstitution::new,
                        institutionRepository,
                        SupportedCsvTemplate.INSTITUTION,
                        importCsvSummary);
    }
}
