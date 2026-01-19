package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.Language;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvLanguage extends InDependentCsv<Language, Integer> {
    private String languageName;
    private static final int LANGUAGE_NAME_ORDER = 1;

    public String getLanguageName() {
        return languageName;
    }

    public void setLanguageName(String languageName) {
        this.languageName = languageName;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(LANGUAGE_NAME_ORDER,
                        f -> this.setLanguageName(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public Language convertToEntity() {
        Language language = new Language();
        language.setLanguageName(this.getLanguageName());
        return language;
    }

    @Override
    public String getMergingKey() {
        return (this.getLanguageName())
                .toLowerCase();
    }

    @Override
    public String getMergingKey(Language language) {
        if (language ==null){
            return "";
        }
        
        return (language.getLanguageName())
                .toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Language language) {
        setIdDatabase(language.getLanguageId());
    }
}
