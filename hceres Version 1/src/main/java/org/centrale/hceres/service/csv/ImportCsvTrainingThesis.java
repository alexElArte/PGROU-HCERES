package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.CsvTrainingThesis;
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
import org.centrale.hceres.repository.NationalityRepository;

@Service
public class ImportCsvTrainingThesis {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private NationalityRepository nationalityRepository;
    
    @Autowired
    private ResearcherRepository researcherRepository;

    public Map<Integer, GenericCsv<Activity, Integer>> importCsvList(
            List<?> trainingThesisRows,
            ImportCsvSummary importCsvSummary,
            Map<Integer, CsvActivity> activityMap) {

        return new GenericCsvImporter<Activity, Integer>().importCsvList(
                trainingThesisRows,
                () ->         new CsvTrainingThesis(researcherRepository, nationalityRepository),
                () -> activityRepo.findByIdTypeActivity(TypeActivityId.TRAINING_THESIS_PUBLICATION.getId()),
                activityRepo::saveAll,
                SupportedCsvTemplate.TRAINING_THESIS,
                importCsvSummary
        );
    }
}
