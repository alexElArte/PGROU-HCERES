package org.centrale.hceres.dto.csv.utils;

import lombok.Data;

import java.util.List;

@Data
public abstract class DependentCsv<E, I> implements GenericCsv<E, I> {

    /**
     * id Database is not present in csv fields,
     * it is generated on insert to database, either found by defined merging rules.
     * It may be a concatenation of foreign keys (example case of BelongTeam) or a simple id (example case of Laboratory)
     * It is set by {@link #setIdDatabaseFromEntity}
     */
    private I idDatabase;

    public I getIdDatabase() {
        return idDatabase;
    }

    public void setIdDatabase(I idDatabase) {
        this.idDatabase = idDatabase;
    }

    /**
     * Take the data from the csv and fill the csvInstitution object and initialize dependencies
     *
     * @param csvData List of data from the csv
     */
    @Override
    public final void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> this.fillCsvDataWithoutDependency(csvData),
                this::initializeDependencies
        );
    }

    /**
     * Take the data from the csv and fill the csvInstitution object and initialize dependencies
     *
     * @param csvData List of data from the csv
     */
    public abstract void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions;

    /**
     * Initialize dependencies of the entity after filling the csv data containing foreign keys
     * to be used in mapping.
     */
    public abstract void initializeDependencies() throws CsvAllFieldExceptions;
}
