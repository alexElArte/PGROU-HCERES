package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.Nationality;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvNationality extends InDependentCsv<Nationality, Integer> {
    private String nationalityName;
    private static final int NATIONALITY_NAME_ORDER = 1;

    public String getNationalityName() {
        return nationalityName;
    }

    public void setNationalityName(String nationalityName) {
        this.nationalityName = nationalityName;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(NATIONALITY_NAME_ORDER,
                        f -> this.setNationalityName(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public Nationality convertToEntity() {
        Nationality nationality = new Nationality();
        nationality.setNationalityName(this.getNationalityName());
        return nationality;
    }

    @Override
    public String getMergingKey() {
        return (this.getNationalityName())
                .toLowerCase();
    }

    @Override
    public String getMergingKey(Nationality nationality) {
        if (nationality == null){   
            return "";
        }
        
        return (nationality.getNationalityName())
                .toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Nationality nationality) {
        setIdDatabase(nationality.getNationalityId());
    }
}
