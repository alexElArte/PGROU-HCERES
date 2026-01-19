package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParseFieldException;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvResearcher extends InDependentCsv<Researcher, Integer> {
    // id Database is generated on insert to database, either found by defined merging rules
    private String researcherSurname;
    private static final int RESEARCHER_SURNAME_ORDER = 1;
    private String researcherName;
    private static final int RESEARCHER_NAME_ORDER = 2;
    private String researcherEmail;
    private static final int RESEARCHER_EMAIL_ORDER = 3;

    public String getResearcherSurname() {
        return researcherSurname;
    }

    public void setResearcherSurname(String researcherSurname) {
        this.researcherSurname = researcherSurname;
    }

    public String getResearcherName() {
        return researcherName;
    }

    public void setResearcherName(String researcherName) {
        this.researcherName = researcherName;
    }

    public String getResearcherEmail() {
        return researcherEmail;
    }

    public void setResearcherEmail(String researcherEmail) {
        this.researcherEmail = researcherEmail;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(RESEARCHER_SURNAME_ORDER,
                        f -> this.setResearcherSurname(RequestParser.getAsString(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(RESEARCHER_NAME_ORDER,
                        f -> this.setResearcherName(RequestParser.getAsString(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(RESEARCHER_EMAIL_ORDER,
                        f -> this.setResearcherEmail(RequestParser.getAsString(csvData.get(f))))
        );
    }
    @Override
    public Researcher convertToEntity() {
        Researcher researcher = new Researcher();
        researcher.setResearcherSurname(this.getResearcherSurname());
        researcher.setResearcherName(this.getResearcherName());
        researcher.setResearcherEmail(this.getResearcherEmail());
        return researcher;
    }

    @Override
    public String getMergingKey() {
        return (this.getResearcherSurname()
                + this.getResearcherName()
                + this.getResearcherEmail())
                .toLowerCase();
    }

    @Override
    public String getMergingKey(Researcher researcher) {
        return (researcher.getResearcherSurname()
                + researcher.getResearcherName()
                + researcher.getResearcherEmail())
                .toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Researcher researcher) {
        this.setIdDatabase(researcher.getResearcherId());
    }
}
