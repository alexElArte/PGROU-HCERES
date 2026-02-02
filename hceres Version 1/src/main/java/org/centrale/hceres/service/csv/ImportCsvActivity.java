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
     * Construit une map ID -> CsvResearcher
     * à partir de la map idCsv -> GenericCsv<Researcher, Integer>.
     * Cette fonction est une copie de buildSurnameToResearcherMap()
     * en passant par l'id fournit dans le fichier csv plutôt que le
     * nom de famille qui est inexistant dans le fichier conerné
     */
    private Map<String, GenericCsv<Researcher, Integer>> buildCsvIdToResearcherMap(
            Map<Integer, GenericCsv<Researcher, Integer>> csvIdToResearcherMap) {

        Map<String, GenericCsv<Researcher, Integer>> csvIdMap = new HashMap<>();

        for (GenericCsv<Researcher, Integer> genericCsv : csvIdToResearcherMap.values()) {
            if (!(genericCsv instanceof CsvResearcher)) {
                // au cas où un autre type se glisserait dedans
                continue;
            }
            CsvResearcher csvResearcher = (CsvResearcher) genericCsv;
            String csvId = csvResearcher.getResearcherCsvId();

            if (csvId != null && !csvId.isBlank()) {
                String key = csvId.trim();
                // si doublon de nom de famille : on garde le premier
                csvIdMap.putIfAbsent(key, genericCsv);
            }
        }

        return csvIdMap;
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

        // ⚠️ NOUVEAU : map id du hcercheur -> CsvResearcher
        Map<String, GenericCsv<Researcher, Integer>> idToResearcherMap =
                buildCsvIdToResearcherMap(csvIdToResearcherMap);

        // map to store imported Activity from csv,
        EnumMap<TypeActivityId, Map<Integer, CsvActivity>> activityMap = new EnumMap<>(TypeActivityId.class);
        List<ImportCsvError> errors = new ArrayList<>();

        // parse and collect data from csv
        int lineNumber = 0;
        int totalLineErrors = 0;

        for (Object activityRow : activityRows) {
            lineNumber++;

            // ⚠️ NOUVEAU constructeur : on passe la map sur les id des chercheurs
            CsvActivity csvActivity = new CsvActivity(csvIdToTypeActivityMap, idToResearcherMap);

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
