package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParseFieldException;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.PublicationType;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvPublicationType extends InDependentCsv<PublicationType, Integer> {
    private String publicationTypeName;
    private static final int PUBLICATION_TYPE_NAME_ORDER = 1;

    public String getPublicationTypeName() {
        return publicationTypeName;
    }

    public void setPublicationTypeName(String publicationTypeName) {
        this.publicationTypeName = publicationTypeName;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(PUBLICATION_TYPE_NAME_ORDER,
                        f -> this.setPublicationTypeName(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public PublicationType convertToEntity() {
        PublicationType publicationType = new PublicationType();
        publicationType.setPublicationTypeName(this.getPublicationTypeName());
        return publicationType;
    }

    @Override
    public String getMergingKey() {
        return (this.getPublicationTypeName())
                .toLowerCase();
    }

    @Override
    public String getMergingKey(PublicationType publicationType) {
        return (publicationType.getPublicationTypeName())
                .toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(PublicationType publicationType) {
        setIdDatabase(publicationType.getPublicationTypeId());
    }
}
