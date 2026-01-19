package org.centrale.hceres.dto.csv.utils;

public class CsvParseFieldException extends CsvFieldException {
    public CsvParseFieldException(Throwable cause, int fieldNumber) {
        super(cause, fieldNumber);
    }
}
