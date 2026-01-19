package org.centrale.hceres.service.csv;


import org.centrale.hceres.dto.csv.CsvThesisType;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.ThesisType;
import org.centrale.hceres.repository.ThesisTypeRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImportCsvThesisType {

    @Autowired
    private ThesisTypeRepository thesisTypeRepository;

    /**
     * @param csvRows          List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvPhdType}
     */
    public Map<Integer, GenericCsv<ThesisType, Integer>> importCsvList(List<?> csvRows, ImportCsvSummary importCsvSummary) {
        return new GenericCsvImporter<ThesisType, Integer>()
                .importCsvList(csvRows,
                        CsvThesisType::new,
                        thesisTypeRepository,
                        SupportedCsvTemplate.THESIS_TYPE,
                        importCsvSummary);
    }
}
