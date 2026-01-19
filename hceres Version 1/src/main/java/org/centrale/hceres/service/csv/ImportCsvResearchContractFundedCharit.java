package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.CsvResearchContractFundedCharit;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ImportCsvResearchContractFundedCharit {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private ResearcherRepository researcherRepository;

    /**
     * @param researchContractFundedCharitRows list of CSV lines (one List<?> per line)
     * @param importCsvSummary                 summary of the import
     * @param activityMap                      (non utilisé ici, conservé pour compat API)
     */
    public Map<Integer, GenericCsv<Activity, Integer>> importCsvList(
            List<?> researchContractFundedCharitRows,
            ImportCsvSummary importCsvSummary,
            Map<Integer, CsvActivity> activityMap) {

        return new GenericCsvImporter<Activity, Integer>().importCsvList(
                researchContractFundedCharitRows,
                () -> new CsvResearchContractFundedCharit(researcherRepository),
                () -> activityRepo.findByIdTypeActivity(
                        TypeActivityId.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST.getId()
                ),
                activityRepo::saveAll,
                SupportedCsvTemplate.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST,
                importCsvSummary
        );
    }
}
