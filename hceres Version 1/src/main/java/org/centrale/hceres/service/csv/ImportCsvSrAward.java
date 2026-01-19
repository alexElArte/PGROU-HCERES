package org.centrale.hceres.service.csv;

import lombok.Data;
import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.CsvSrAward;
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

@Data
@Service
public class ImportCsvSrAward {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private ResearcherRepository researcherRepository;
    /**
     * @param srAwardRows      list of array having fields as defined in csv
     * @param importCsvSummary Summary of the import
     */
    public Map<Integer, GenericCsv<Activity, Integer>> importCsvList(List<?> srAwardRows, ImportCsvSummary importCsvSummary,
                                                                    Map<Integer, CsvActivity> activityMap) {
        return new GenericCsvImporter<Activity, Integer>().importCsvList(
                srAwardRows,
                () -> new CsvSrAward(researcherRepository),
                () -> activityRepo.findByIdTypeActivity(TypeActivityId.SR_AWARD.getId()),
                activityRepo::saveAll,
                SupportedCsvTemplate.SR_AWARD,
                importCsvSummary);
    }
}
