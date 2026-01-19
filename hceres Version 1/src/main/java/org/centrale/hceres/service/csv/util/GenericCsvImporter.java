package org.centrale.hceres.service.csv.util;

import org.centrale.hceres.dto.csv.CsvInstitution;
import org.centrale.hceres.dto.csv.ImportCsvError;
import org.centrale.hceres.dto.csv.ImportCsvMetric;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public class GenericCsvImporter<E, I> {

    /**
     * @param csvRows List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvInstitution}
     */
    public Map<I, GenericCsv<E, I>> importCsvList(List<?> csvRows,
            CsvDtoFactory<E, I> genericCsvFactory,
            JpaRepository<E, ?> entityRepository,
            SupportedCsvTemplate supportedCsvTemplate,
            ImportCsvSummary importCsvSummary) {
        return importCsvList(csvRows, genericCsvFactory,
                entityRepository::findAll,
                entityRepository::saveAll,
                supportedCsvTemplate, importCsvSummary);
    }

    /**
     * @param csvRows List of csv data
     * @param importCsvSummary Summary of the import
     * @return Map from csv id to {@link CsvInstitution}
     */
    public Map<I, GenericCsv<E, I>> importCsvList(List<?> csvRows,
            CsvDtoFactory<E, I> genericCsvFactory,
            RepoFindAllEntities<E> repoFindAllEntities,
            RepoSaveAllEntities<E> repoSaveAllEntities,
            SupportedCsvTemplate supportedCsvTemplate,
            ImportCsvSummary importCsvSummary) {
        // map to store imported entities from csv,
        // with merging key as key
        Map<String, GenericCsv<E, I>> csvEntityMap = new LinkedHashMap<>();
        List<ImportCsvError> errors = new ArrayList<>();

        // parse and collect data from csv
        int lineNumber = 0;
        int totalLineErrors = 0;
        int totalDuplicatesInCsv = 0;
        HashMap<String, List<Integer>> keyToDuplicatesInCsv = new HashMap<>();
        Map<Integer, GenericCsv<E, I>> lineNumberToCsvEntityMap = new HashMap<>();

        for (Object csvRow : csvRows) {
            lineNumber++;
            GenericCsv<E, I> csvEntity = genericCsvFactory.newCsvDto();
            try {
                List<?> csvData = (List<?>) csvRow;
                csvEntity.fillCsvData(csvData);
            } catch (CsvAllFieldExceptions e) {
                totalLineErrors++;
                for (CsvFieldException exception : e.getExceptions()) {
                    errors.add(new ImportCsvError(exception, lineNumber));
                }
                continue;
            }
            String key = csvEntity.getMergingKey();
            if (csvEntityMap.containsKey(key)) {
                totalDuplicatesInCsv++;
            }
            List<Integer> duplicates = keyToDuplicatesInCsv.computeIfAbsent(key, k -> new ArrayList<>());
            lineNumberToCsvEntityMap.put(lineNumber, csvEntity);
            duplicates.add(lineNumber);
            // last row wins
            csvEntityMap.put(key, csvEntity);
        }
        keyToDuplicatesInCsv.values().removeIf(l -> l.size() == 1);
        // map to store the entities already present in the database,
        // with merging key as key
        GenericCsv<E, I> csvEntityUtil = genericCsvFactory.newCsvDto();
        Map<String, E> entityMap = new LinkedHashMap<>();
        List<E> entitiesInDb = repoFindAllEntities.findAll();
        entitiesInDb.forEach(r -> entityMap.put(csvEntityUtil.getMergingKey(r), r));

        // If an entity with the same merging key already exists in the database, use its id,
        // otherwise prepare it to be saved into the database.
        List<E> entitiesToSave = new ArrayList<>();
        int totalMergedWithDatabase = 0;
        for (Map.Entry<String, GenericCsv<E, I>> entry : csvEntityMap.entrySet()) {
            String key = entry.getKey();
            GenericCsv<E, I> csvEntity = entry.getValue();
            E entityInDb = entityMap.get(key);
            if (entityInDb != null) {
                csvEntity.setIdDatabaseFromEntity(entityInDb);
                totalMergedWithDatabase++;
            }    else {
        // On convertit le CSV en entité
        E entity = csvEntity.convertToEntity();

        // ⚠️ Si la conversion renvoie null (ex. aucun chercheur trouvé),
        // on n’ajoute PAS l’entité à la liste à sauver.
        if (entity == null) {
            continue;
        }

        entitiesToSave.add(entity);
    }

        }

        // Save the entities into the database
        List<E> savedEntities = repoSaveAllEntities.saveAll(entitiesToSave);

        // update the id of the csv Entities using entities that were saved into the database
        // update the id of the csv Entities using entities that were saved into the database
        for (E savedEntity : savedEntities) {
            String key = csvEntityUtil.getMergingKey(savedEntity);
            GenericCsv<E, I> csvEntity = csvEntityMap.get(key);

            // Protection : si on ne retrouve pas le CSV associé, on saute
            if (csvEntity == null) {
                // éventuellement logguer ici si tu veux comprendre les cas qui ne matchent pas
                // ex: System.out.println("No CSV entity found for key: " + key);
                continue;
            }

            csvEntity.setIdDatabaseFromEntity(savedEntity);
        }

        // update the summary
        // Calculate the metrics
        ImportCsvMetric importCsvMetric = new ImportCsvMetric();
        // On parsing
        importCsvMetric.setTotalInCsv(csvRows.size());
        importCsvMetric.setTotalLineErrors(totalLineErrors);
        importCsvMetric.setTotalErrors(errors.size());
        importCsvMetric.setTotalDuplicatesInCsv(totalDuplicatesInCsv);
        importCsvMetric.setDuplicateLines(new ArrayList<>(keyToDuplicatesInCsv.values()));

        // On saving
        importCsvMetric.setTotalInDatabase(entitiesInDb.size() + entitiesToSave.size());
        importCsvMetric.setTotalMergedWithDatabase(totalMergedWithDatabase);
        importCsvMetric.setTotalInserted(entitiesToSave.size());

        importCsvSummary.getEntityToCsvMetrics().put(supportedCsvTemplate.toString(), importCsvMetric);
        importCsvSummary.getEntityToCsvErrors().put(supportedCsvTemplate.toString(), errors);

        // return the map from csv id to csv entity
        Map<I, GenericCsv<E, I>> csvEntityIdMap = new LinkedHashMap<>();
        csvEntityMap.forEach((k, v) -> csvEntityIdMap.put(v.getIdCsv(), v));
        // map duplicates to the inserted entity (last line wins)
        // this fixes any dependencies using the skipped duplicates ids
        for (List<Integer> duplicates : keyToDuplicatesInCsv.values()) {
            Integer lastLine = duplicates.get(duplicates.size() - 1);
            I idCsvEntity = lineNumberToCsvEntityMap.get(lastLine).getIdCsv();
            for (int i = 0; i < duplicates.size() - 1; i++) {
                csvEntityIdMap.put(lineNumberToCsvEntityMap.get(duplicates.get(i)).getIdCsv(), csvEntityIdMap.get(idCsvEntity));
            }
        }
        return csvEntityIdMap;
    }
}
