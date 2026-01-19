package org.centrale.hceres.service.csv;

import lombok.Data;
import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.CsvResearcher;
import org.centrale.hceres.dto.csv.ImportCsvError;
import org.centrale.hceres.dto.csv.ImportCsvMetric;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.*;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Data
@Service
public class ImportCsvActivity {

    /**
     * Construit une map NOM_DE_FAMILLE -> CsvResearcher
     * à partir de la map idCsv -> GenericCsv<Researcher, Integer>.
     */
    private Map<String, GenericCsv<Researcher, Integer>> buildSurnameToResearcherMap(
            Map<Integer, GenericCsv<Researcher, Integer>> csvIdToResearcherMap) {

        Map<String, GenericCsv<Researcher, Integer>> surnameMap = new HashMap<>();

        for (GenericCsv<Researcher, Integer> genericCsv : csvIdToResearcherMap.values()) {
            if (!(genericCsv instanceof CsvResearcher)) {
                // au cas où un autre type se glisserait dedans
                continue;
            }
            CsvResearcher csvResearcher = (CsvResearcher) genericCsv;
            String surname = csvResearcher.getResearcherSurname();

            if (surname != null && !surname.isBlank()) {
                String key = surname.trim().toUpperCase(Locale.ROOT);
                // si doublon de nom de famille : on garde le premier
                surnameMap.putIfAbsent(key, genericCsv);
            }
        }

        return surnameMap;
    }

    /**
     * @param activityRows list of array having fields as defined in csv
     * @return map from csv Activity type as defined in {@link org.centrale.hceres.items.TypeActivityId}
     * to all activities of that type using specific activity count as key from csv file
     */
    public Map<TypeActivityId, Map<Integer, CsvActivity>> importCsvList(
            List<?> activityRows,
            ImportCsvSummary importCsvSummary,
            Map<Integer, GenericCsv<Researcher, Integer>> csvIdToResearcherMap,
            Map<Integer, GenericCsv<TypeActivity, Integer>> csvIdToTypeActivityMap) {

        // ⚠️ NOUVEAU : map nom de famille -> CsvResearcher
        Map<String, GenericCsv<Researcher, Integer>> surnameToResearcherMap =
                buildSurnameToResearcherMap(csvIdToResearcherMap);

        // map to store imported Activity from csv,
        EnumMap<TypeActivityId, Map<Integer, CsvActivity>> activityMap = new EnumMap<>(TypeActivityId.class);
        List<ImportCsvError> errors = new ArrayList<>();

        // parse and collect data from csv
        int lineNumber = 0;
        int totalLineErrors = 0;

        for (Object activityRow : activityRows) {
            lineNumber++;

            // ⚠️ NOUVEAU constructeur : on passe la map sur les noms de famille
            CsvActivity csvActivity = new CsvActivity(csvIdToTypeActivityMap, surnameToResearcherMap);

            List<?> csvData = (List<?>) activityRow;
            try {
                csvActivity.fillCsvData(csvData);
            } catch (CsvAllFieldExceptions e) {
                totalLineErrors++;
                for (CsvFieldException exception : e.getExceptions()) {
                    errors.add(new ImportCsvError(exception, lineNumber));
                }
                continue;
            }

            int activityTypeId = csvActivity.getCsvTypeActivity().getIdDatabase();
            TypeActivityId activityType = TypeActivityId.fromId(activityTypeId);
            activityMap.computeIfAbsent(activityType, k -> new HashMap<>());
            activityMap.get(activityType).put(csvActivity.getSpecificActivityCount(), csvActivity);
        }

        // Calculate the metrics
        ImportCsvMetric importCsvMetric = new ImportCsvMetric();
        // On parsing
        importCsvMetric.setTotalInCsv(activityRows.size());
        importCsvMetric.setTotalLineErrors(totalLineErrors);
        importCsvMetric.setTotalErrors(errors.size());

        importCsvSummary.getEntityToCsvMetrics()
                .put(SupportedCsvTemplate.ACTIVITY.toString(), importCsvMetric);
        importCsvSummary.getEntityToCsvErrors()
                .put(SupportedCsvTemplate.ACTIVITY.toString(), errors);

        return activityMap;
    }
}
