package org.centrale.hceres.dto.csv.utils;

public interface CsvGenericCallBack {
    void call() throws CsvFieldException, CsvAllFieldExceptions;
}
