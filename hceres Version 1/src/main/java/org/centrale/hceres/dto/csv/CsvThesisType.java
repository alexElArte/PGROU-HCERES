package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParseFieldException;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.ThesisType;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;

import java.util.List;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvThesisType extends InDependentCsv<ThesisType, Integer> {
    private String phdTypeName;
    private static final int PHD_TYPE_NAME_ORDER = 1;

    public String getPhdTypeName() {
        return phdTypeName;
    }

    public void setPhdTypeName(String phdTypeName) {
        this.phdTypeName = phdTypeName;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(PHD_TYPE_NAME_ORDER,
                        f -> this.setPhdTypeName(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public ThesisType convertToEntity() {
        ThesisType phdType = new ThesisType();
        phdType.setThesisTypeName(this.getPhdTypeName());
        return phdType;
    }

    @Override
    public String getMergingKey() {
        return (this.getPhdTypeName())
                .toLowerCase();
    }

    @Override
    public String getMergingKey(ThesisType thesisType) {
        if (thesisType == null){
        return "";
        }
        return (thesisType.getThesisTypeName())
                .toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(ThesisType phdType) {
        setIdDatabase(phdType.getThesisTypeId());
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 53 * hash + Objects.hashCode(this.phdTypeName);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final CsvThesisType other = (CsvThesisType) obj;
        return Objects.equals(this.phdTypeName, other.phdTypeName);
    }
    
    
}
