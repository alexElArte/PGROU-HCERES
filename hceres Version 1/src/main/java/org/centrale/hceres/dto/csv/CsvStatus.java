package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParseFieldException;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.Status;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvStatus extends InDependentCsv<Status, Integer> {
    private String statusName;
    private static final int STATUS_NAME_ORDER = 1;

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(STATUS_NAME_ORDER,
                        f -> this.setStatusName(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public Status convertToEntity() {
        Status status = new Status();
        status.setStatusName(this.getStatusName());
        return status;
    }

    @Override
    public String getMergingKey() {
        return (this.getStatusName())
                .toLowerCase();
    }

    @Override
    public String getMergingKey(Status status) {
        return (status.getStatusName())
                .toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Status status) {
        setIdDatabase(status.getStatusId());
    }
}
