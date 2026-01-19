package org.centrale.hceres.service.csv;


import org.centrale.hceres.dto.csv.CsvNationality;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Nationality;
import org.centrale.hceres.repository.NationalityRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImportCsvNationality {

    @Autowired
    private NationalityRepository nationalityRepository;

    /**
     * @param csvRows          List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvNationality}
     */
    public Map<Integer, GenericCsv<Nationality, Integer>> importCsvList(List<?> csvRows, ImportCsvSummary importCsvSummary) {
        return new GenericCsvImporter<Nationality, Integer>()
                .importCsvList(csvRows,
                        CsvNationality::new,
                        nationalityRepository,
                        SupportedCsvTemplate.NATIONALITY,
                        importCsvSummary);
    }
}
