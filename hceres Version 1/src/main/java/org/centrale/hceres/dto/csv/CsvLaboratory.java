package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.DependentCsv;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.dto.csv.utils.SupportedCsvTemplate;
import org.centrale.hceres.items.Institution;
import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.util.RequestParser;

import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvLaboratory extends DependentCsv<Laboratory, Integer> {

    // CSV: laboratory_id;laboratory_name;laboratory_acronym;institution_id
    private Integer idCsv; // laboratory_id (ID métier dans ton CSV)
    private static final int ID_CSV_ORDER = 0;

    private String laboratoryName;
    private static final int LABORATORY_NAME_ORDER = 1;

    private String laboratoryAcronym;
    private static final int LABORATORY_ACRONYM_ORDER = 2;

    private Integer institutionIdCsv; // institution_id (ID métier dans ton CSV)
    private static final int INSTITUTION_ID_CSV_ORDER = 3;

    // Dépendance résolue grâce à la map (clé = institution_id lu dans le CSV institution)
    private GenericCsv<Institution, Integer> csvInstitution;
    private final Map<Integer, GenericCsv<Institution, Integer>> institutionIdCsvMap;

    public CsvLaboratory(Map<Integer, GenericCsv<Institution, Integer>> institutionIdCsvMap) {
        this.institutionIdCsvMap = institutionIdCsvMap;
    }

    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(LABORATORY_NAME_ORDER,
                        f -> this.setLaboratoryName(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(LABORATORY_ACRONYM_ORDER,
                        f -> this.setLaboratoryAcronym(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(INSTITUTION_ID_CSV_ORDER,
                        f -> this.setInstitutionIdCsv(RequestParser.getAsInteger(csvData.get(f))))
        );
    }

    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        if (this.institutionIdCsvMap == null) {
            System.out.println("[CSV Laboratory] institutionIdCsvMap is null -> cannot resolve institution dependency.");
            return;
        }

        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvDependencyException(
                        INSTITUTION_ID_CSV_ORDER,
                        this.getInstitutionIdCsv(),
                        SupportedCsvTemplate.INSTITUTION,
                        this.institutionIdCsvMap.get(this.getInstitutionIdCsv()),
                        this::setCsvInstitution
                )
        );

        if (this.csvInstitution == null) {
            System.out.println("[CSV Laboratory] Institution ref not found: institution_id="
                    + this.getInstitutionIdCsv() + " for laboratory_id=" + this.getIdCsv());
        }
    }

    @Override
    public Laboratory convertToEntity() {
        // tout-ou-rien : l’institution est obligatoire
        if (this.getCsvInstitution() == null || this.getCsvInstitution().getIdDatabase() == null) {
            System.out.println("[CSV Laboratory] Institution not resolved for laboratory_id="
                    + this.getIdCsv()
                    + " (institution_id=" + this.getInstitutionIdCsv() + ") -> line ignored.");
            return null;
        }

        Laboratory laboratory = new Laboratory();
        laboratory.setLaboratoryName(this.getLaboratoryName());
        laboratory.setLaboratoryAcronym(this.getLaboratoryAcronym());

        // IMPORTANT : instancier Institution (sinon NPE)
        Institution inst = new Institution();
        inst.setInstitutionId(this.getCsvInstitution().getIdDatabase());
        laboratory.setInstitution(inst);

        return laboratory;
    }

    @Override
    public void setIdDatabaseFromEntity(Laboratory entity) {
        setIdDatabase(entity.getLaboratoryId());
    }

    @Override
    public Integer getIdCsv() {
        return this.idCsv;
    }

    @Override
    public String getMergingKey() {
        // Si institution pas résolue, on ne merge pas (et de toute façon convertToEntity() renvoie null)
        if (this.getCsvInstitution() == null || this.getCsvInstitution().getIdDatabase() == null) {
            return "";
        }
        String institutionPart = this.getCsvInstitution().getIdDatabase().toString();
        String labNamePart = this.getLaboratoryName() != null ? this.getLaboratoryName().trim() : "";
        return (institutionPart + "_" + labNamePart).toLowerCase();
    }

    @Override
    public String getMergingKey(Laboratory entity) {
        if (entity == null || entity.getInstitution() == null || entity.getInstitution().getInstitutionId() == null) {
            return "";
        }
        String institutionPart = entity.getInstitution().getInstitutionId().toString();
        String labNamePart = entity.getLaboratoryName() != null ? entity.getLaboratoryName().trim() : "";
        return (institutionPart + "_" + labNamePart).toLowerCase();
    }

    public String getLaboratoryName() {
        return laboratoryName;
    }

    public void setLaboratoryName(String laboratoryName) {
        this.laboratoryName = laboratoryName;
    }

    public String getLaboratoryAcronym() {
        return laboratoryAcronym;
    }

    public void setLaboratoryAcronym(String laboratoryAcronym) {
        this.laboratoryAcronym = laboratoryAcronym;
    }

    public Integer getInstitutionIdCsv() {
        return institutionIdCsv;
    }

    public void setInstitutionIdCsv(Integer institutionIdCsv) {
        this.institutionIdCsv = institutionIdCsv;
    }

    public GenericCsv<Institution, Integer> getCsvInstitution() {
        return csvInstitution;
    }

    public void setCsvInstitution(GenericCsv<Institution, Integer> csvInstitution) {
        this.csvInstitution = csvInstitution;
    }

    public void setIdCsv(Integer idCsv) {
        this.idCsv = idCsv;
    }
    
    
}
