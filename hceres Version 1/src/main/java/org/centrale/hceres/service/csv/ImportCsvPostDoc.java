package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.CsvPostDoc;
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
import org.centrale.hceres.dto.csv.CsvActivity;

@Service
public class ImportCsvPostDoc {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private ResearcherRepository researcherRepo;

    /**
     * Imports PostDoc CSV into the database.
     *
     * @param postDocRows List of CSV rows
     * @param importCsvSummary Summary of CSV import
     * @param activityMap Map of idCsvActivity → CsvActivity
     */
    public Map<Integer, GenericCsv<Activity, Integer>> importCsvList(
            List<?> postDocRows,
            ImportCsvSummary importCsvSummary,
            Map<Integer, CsvActivity> activityMap) {

        return new GenericCsvImporter<Activity, Integer>().importCsvList(
                postDocRows,
                () -> new CsvPostDoc(researcherRepo), // ✅ passe aussi researcherRepo
                () -> activityRepo.findByIdTypeActivity(TypeActivityId.POST_DOC.getId()),
                activityRepo::saveAll,
                SupportedCsvTemplate.POSTDOC,
                importCsvSummary
        );
    }
}
