package org.centrale.hceres.dto.csv.utils;

import lombok.Getter;

import java.util.List;

@Getter
public class CsvAllFieldExceptions extends Exception {
    private final List<CsvFieldException> exceptions;

    public CsvAllFieldExceptions(List<CsvFieldException> exceptions) {
        this.exceptions = exceptions;
    }

    public List<CsvFieldException> getExceptions() {
        return exceptions;
    }
}

