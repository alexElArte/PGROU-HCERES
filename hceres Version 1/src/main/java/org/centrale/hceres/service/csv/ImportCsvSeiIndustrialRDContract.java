package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.CsvSeiIndustrialRDContract;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import org.centrale.hceres.repository.ResearcherRepository;


@Service
public class ImportCsvSeiIndustrialRDContract {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private ResearcherRepository researcherRepository;

    public Map<Integer, GenericCsv<Activity, Integer>> importCsvList(
            List<?> rows,
            ImportCsvSummary importCsvSummary) {

        return new GenericCsvImporter<Activity, Integer>().importCsvList(
                rows,
                () -> new CsvSeiIndustrialRDContract(researcherRepository),
                () -> activityRepo.findByIdTypeActivity(TypeActivityId.SEI_INDUSTRIAL_R_D_CONTRACT.getId()),
                activityRepo::saveAll,
                SupportedCsvTemplate.SEI_INDUSTRIAL_R_D_CONTRACT,
                importCsvSummary
        );
    }
}
