package org.centrale.hceres.service.csv;


import org.centrale.hceres.dto.csv.CsvLanguage;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Language;
import org.centrale.hceres.repository.LanguageRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImportCsvLanguage {

    @Autowired
    private LanguageRepository languageRepository;

    /**
     * @param csvRows          List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvLanguage}
     */
    public Map<Integer, GenericCsv<Language, Integer>> importCsvList(List<?> csvRows, ImportCsvSummary importCsvSummary) {
        return new GenericCsvImporter<Language, Integer>()
                .importCsvList(csvRows,
                        CsvLanguage::new,
                        languageRepository,
                        SupportedCsvTemplate.LANGUAGE,
                        importCsvSummary);
    }
}
