package org.centrale.hceres.service.csv.util;

import org.centrale.hceres.dto.csv.utils.GenericCsv;

public interface CsvDtoFactory <E, I>{
    GenericCsv<E, I> newCsvDto();
}
