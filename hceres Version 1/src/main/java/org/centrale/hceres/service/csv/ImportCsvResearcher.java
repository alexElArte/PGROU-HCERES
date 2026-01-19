package org.centrale.hceres.service.csv;

import lombok.Data;
import org.centrale.hceres.dto.csv.CsvResearcher;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Data
@Service
public class ImportCsvResearcher {
    /**
     * Instanciation de ResearchRepository
     */
    @Autowired
    private ResearcherRepository researchRepo;

    /**
     * @param researchersRows  list of array having fields as defined in csv
     * @param importCsvSummary
     * @return map from csv researcher id to the ImportedResearcher object
     */
    public Map<Integer, GenericCsv<Researcher, Integer>> importCsvList(List<?> researchersRows, ImportCsvSummary importCsvSummary) {
        return new GenericCsvImporter<Researcher, Integer>().importCsvList(researchersRows,
                CsvResearcher::new,
                researchRepo,
                SupportedCsvTemplate.RESEARCHER,
                importCsvSummary);

    }
}
