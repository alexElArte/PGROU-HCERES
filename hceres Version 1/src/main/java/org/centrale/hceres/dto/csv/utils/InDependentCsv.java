package org.centrale.hceres.dto.csv.utils;

import lombok.Data;

@Data
public  abstract class InDependentCsv<E, I> implements GenericCsv<E, I> {
    private I idCsv;
    protected static final int ID_CSV_ORDER = 0;

    // id Database is not present in csv fields,
    // it is generated on insert to database, either found by defined merging rules
    private I idDatabase;

    public I getIdCsv() {
        return idCsv;
    }

    public void setIdCsv(I idCsv) {
        this.idCsv = idCsv;
    }

    public I getIdDatabase() {
        return idDatabase;
    }

    public void setIdDatabase(I idDatabase) {
        this.idDatabase = idDatabase;
    }
}
