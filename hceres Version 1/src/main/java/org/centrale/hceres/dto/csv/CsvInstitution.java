package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.Institution;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvInstitution extends InDependentCsv<Institution, Integer> {

    // CSV: "institution_id";"institution_name"
    // ID_CSV_ORDER est défini dans InDependentCsv (index 0)
    private String institutionName;
    private static final int INSTITUTION_NAME_ORDER = 1;

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(INSTITUTION_NAME_ORDER,
                        f -> this.setInstitutionName(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public Institution convertToEntity() {
        Institution institution = new Institution();
        institution.setInstitutionName(this.getInstitutionName());
        return institution;
    }

    @Override
    public String getMergingKey() {
        // "this == null" n'a jamais de sens en Java ici
        if (this.institutionName == null) {
            return "";
        }
        return this.institutionName.trim().toLowerCase();
    }

    @Override
    public String getMergingKey(Institution institution) {
        if (institution == null || institution.getInstitutionName() == null) {
            return "";
        }
        return institution.getInstitutionName().trim().toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Institution institution) {
        setIdDatabase(institution.getInstitutionId());
    }

    @Override
    public Integer getIdCsv() {
        // clé de map = institution_id lu dans le CSV
        return super.getIdCsv();
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }
    
    
}
