package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvTypeActivity extends InDependentCsv<TypeActivity, Integer> {
    private String nameType;
    private static final int NAME_TYPE_ORDER = 1;

    public String getNameType() {
        return nameType;
    }

    public void setNameType(String nameType) {
        this.nameType = nameType;
    }
    
    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(NAME_TYPE_ORDER,
                        f -> this.setNameType(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public TypeActivity convertToEntity() {
        TypeActivity typeActivity = new TypeActivity();
        // exception for idTypeActivity as it is fixed in application with enum
        typeActivity.setIdTypeActivity(this.getIdCsv());
        typeActivity.setNameType(this.getNameType());
        return typeActivity;
    }

    @Override
    public String getMergingKey() {
        return this.getIdCsv().toString();
    }

    /**
     * Type activity ids aren't question to change as hardcoded types are used in enum everywhere
     */
    @Override
    public String getMergingKey(TypeActivity typeActivity) {
        return typeActivity.getIdTypeActivity().toString();
    }

    @Override
    public void setIdDatabaseFromEntity(TypeActivity typeActivity) {
        setIdDatabase(typeActivity.getIdTypeActivity());
    }

}
