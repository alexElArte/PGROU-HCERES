package org.centrale.hceres.dto.csv.utils;

import lombok.Getter;

@Getter
public class CsvFieldException extends Exception {
    private final int fieldNumber;

    public CsvFieldException(String message, int fieldNumber) {
        super(message);
        this.fieldNumber = fieldNumber;
    }

    public CsvFieldException(String message, Throwable cause, int fieldNumber) {
        super(message, cause);
        this.fieldNumber = fieldNumber;
    }

    public CsvFieldException(Throwable cause, int fieldNumber) {
        super(cause);
        this.fieldNumber = fieldNumber;
    }


    public CsvFieldException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, int fieldNumber) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.fieldNumber = fieldNumber;
    }

    public int getFieldNumber() {
        return fieldNumber;
    }
    
}
