package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.InDependentCsv;
import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.items.Team;
import org.centrale.hceres.repository.LaboratoryRepository;
import org.centrale.hceres.util.RequestParser;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvTeam extends InDependentCsv<Team, Integer> {

    // CSV: "team_id";"team_name";"laboratory_id"
    private String teamName;
    private static final int TEAM_NAME_ORDER = 1;

    private Integer laboratoryId; // ID BD du labo existant
    private static final int LABORATORY_ID_ORDER = 2;

    private final LaboratoryRepository laboratoryRepository;

    public CsvTeam(LaboratoryRepository laboratoryRepository) {
        this.laboratoryRepository = laboratoryRepository;
    }

    @Override
    public void fillCsvData(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(TEAM_NAME_ORDER,
                        f -> this.setTeamName(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(LABORATORY_ID_ORDER,
                        f -> this.setLaboratoryId(RequestParser.getAsInteger(csvData.get(f))))
        );
    }

    @Override
    public Team convertToEntity() {

        // Contraintes: team_id, team_name, laboratory_id obligatoires
        if (this.getIdCsv() == null) {
            System.err.println("[CSV Team] SKIP: team_id missing (null)");
            return null;
        }

        if (this.teamName == null || this.teamName.trim().isEmpty()) {
            System.err.println("[CSV Team] SKIP team_id=" + this.getIdCsv() + " : team_name missing/blank");
            return null;
        }

        if (this.laboratoryId == null) {
            System.err.println("[CSV Team] SKIP team_id=" + this.getIdCsv() + " : laboratory_id missing (null)");
            return null;
        }

        Laboratory lab = laboratoryRepository.findById(this.laboratoryId).orElse(null);
        if (lab == null) {
            System.err.println("[CSV Team] SKIP team_id=" + this.getIdCsv()
                    + " : laboratory_id not found in DB: " + this.laboratoryId);
            return null;
        }

        Team team = new Team();
        team.setTeamName(this.teamName.trim());

        // Relation
        team.setLaboratory(lab);

        // IMPORTANT : garantit que la colonne team.laboratory_id n'est jamais null à l'insert
        // (à utiliser si ton entité Team possède un champ FK "laboratoryId")
        try {
            team.getClass().getMethod("setLaboratoryId", Integer.class).invoke(team, this.laboratoryId);
        } catch (Exception ignored) {
            // si le setter n'existe pas, on ne fait rien : la relation doit alors gérer la FK
            // mais si tu continues à avoir l'erreur, c'est que le mapping JPA n'écrit pas la FK via la relation.
        }

        return team;
    }

    @Override
    public String getMergingKey() {
        if (this.teamName == null || this.teamName.trim().isEmpty() || this.laboratoryId == null) {
            return "";
        }
        return (this.teamName.trim() + "_" + this.laboratoryId).toLowerCase();
    }

    @Override
    public String getMergingKey(Team entity) {
        if (entity == null || entity.getTeamName() == null) return "";

        Integer labId = null;

        if (entity.getLaboratory() != null) {
            labId = entity.getLaboratory().getLaboratoryId();
        } else {
            // si ton Team a un champ laboratoryId direct, adapte si getter existe
            try {
                Object v = entity.getClass().getMethod("getLaboratoryId").invoke(entity);
                if (v instanceof Integer) labId = (Integer) v;
            } catch (Exception ignored) {}
        }

        if (labId == null) return "";
        return (entity.getTeamName().trim() + "_" + labId).toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Team entity) {
        setIdDatabase(entity.getTeamId());
    }

    @Override
    public Integer getIdCsv() {
        return super.getIdCsv();
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Integer getLaboratoryId() {
        return laboratoryId;
    }

    public void setLaboratoryId(Integer laboratoryId) {
        this.laboratoryId = laboratoryId;
    }
    
}
