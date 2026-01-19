package org.centrale.hceres.dto.csv.utils;

import org.centrale.hceres.util.RequestParseException;

public interface CsvParseFieldCallBack {
    void parse(int fieldNumber) throws RequestParseException;
}
