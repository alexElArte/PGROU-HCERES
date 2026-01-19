package org.centrale.hceres.dto.csv.utils;

import java.util.List;

/**
 * Generic interface for csv entity
 *
 * @param <E> Entity
 * @param <I> Type of id used for the entity
 */
public interface GenericCsv<E, I> {
    /**
     * Take the data from the csv and fill the csvInstitution object
     *
     * @param csvData List of data representing a row from the csv
     */
    void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions;


    /**
     * Convert the csvEntity to an entity
     *
     * @return Entity
     */
    E convertToEntity();

    /**
     * Get the merging key for the csv entity
     * It use values that can be compared to entity saved in database.
     * Use of id csv for dependent relation is forbidden. Use id database instead.
     *
     * @return merging key
     */
    String getMergingKey();

    /**
     * Get the merging key for the entity
     *
     * @param entity entity
     * @return merging key
     */
    String getMergingKey(E entity);


    /**
     * Define id of the entity in database, usually ID type is Long (Simple table),
     * but it can be a String when it consists of a concatenation of foreign keys (example of ManyToMany relation)
     *
     * @return id database
     */
    I getIdDatabase();

    /**
     * fill missing {@link #getIdDatabase} from the entity
     *
     * @param entity entity extracted from database
     */
    void setIdDatabaseFromEntity(E entity);

    /**
     * similar to {@link #getIdDatabase()} but using csv data
     * @return id csv
     */
    I getIdCsv();

}
