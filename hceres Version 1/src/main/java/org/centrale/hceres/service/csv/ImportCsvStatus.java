package org.centrale.hceres.service.csv;


import org.centrale.hceres.dto.csv.CsvStatus;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Status;
import org.centrale.hceres.repository.StatusRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImportCsvStatus {

    @Autowired
    private StatusRepository statusRepository;

    /**
     * @param csvRows          List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvStatus}
     */
    public Map<Integer, GenericCsv<Status, Integer>> importCsvList(List<?> csvRows, ImportCsvSummary importCsvSummary) {
        return new GenericCsvImporter<Status, Integer>()
                .importCsvList(csvRows,
                        CsvStatus::new,
                        statusRepository,
                        SupportedCsvTemplate.STATUS,
                        importCsvSummary);
    }
}
