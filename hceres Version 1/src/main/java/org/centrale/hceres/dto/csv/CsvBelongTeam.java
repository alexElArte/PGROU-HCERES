package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.*;
import org.centrale.hceres.items.BelongsTeam;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.Team;
import org.centrale.hceres.util.RequestParser;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
public class CsvBelongTeam extends DependentCsv<BelongsTeam, Integer> {

    // CSV: "Belongs_Team_ID";"Researcher_ID";"Team_ID"
    private Integer idCsvBelongsTeam;
    private static final int ID_CSV_BELONGS_TEAM_ORDER = 0;

    private Integer idCsvResearcher;
    private static final int ID_CSV_RESEARCHER_ORDER = 1;

    private Integer idTeamCsv;
    private static final int ID_TEAM_CSV_ORDER = 2;

    private GenericCsv<Researcher, Integer> csvResearcher;
    private GenericCsv<Team, Integer> csvTeam;

    private final Map<Integer, GenericCsv<Researcher, Integer>> researcherIdCsvMap;
    private final Map<Integer, GenericCsv<Team, Integer>> teamIdCsvMap;

    public CsvBelongTeam(Map<Integer, GenericCsv<Researcher, Integer>> researcherIdCsvMap,
                         Map<Integer, GenericCsv<Team, Integer>> teamIdCsvMap) {
        this.researcherIdCsvMap = researcherIdCsvMap;
        this.teamIdCsvMap = teamIdCsvMap;
    }

    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(
                        ID_CSV_BELONGS_TEAM_ORDER,
                        f -> this.setIdCsvBelongsTeam(RequestParser.getAsInteger(csvData.get(f)))
                ),
                () -> CsvParserUtil.wrapCsvParseException(
                        ID_CSV_RESEARCHER_ORDER,
                        f -> this.setIdCsvResearcher(RequestParser.getAsInteger(csvData.get(f)))
                ),
                () -> CsvParserUtil.wrapCsvParseException(
                        ID_TEAM_CSV_ORDER,
                        f -> this.setIdTeamCsv(RequestParser.getAsInteger(csvData.get(f)))
                )
        );
    }

    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        // Dépendances strictes : Researcher_ID et Team_ID ne doivent pas être null
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvDependencyException(
                        ID_CSV_RESEARCHER_ORDER,
                        this.getIdCsvResearcher(),
                        SupportedCsvTemplate.RESEARCHER,
                        this.researcherIdCsvMap == null ? null : this.researcherIdCsvMap.get(this.getIdCsvResearcher()),
                        this::setCsvResearcher
                ),
                () -> CsvParserUtil.wrapCsvDependencyException(
                        ID_TEAM_CSV_ORDER,
                        this.getIdTeamCsv(),
                        SupportedCsvTemplate.TEAM,
                        this.teamIdCsvMap == null ? null : this.teamIdCsvMap.get(this.getIdTeamCsv()),
                        this::setCsvTeam
                )
        );
    }

    @Override
public BelongsTeam convertToEntity() {
    // champs NOT NULL du CSV
    if (idCsvBelongsTeam == null) {
        System.err.println("[CsvBelongTeam] REJECT: Belongs_Team_ID is null");
        return null;
    }
    if (idCsvResearcher == null) {
        System.err.println("[CsvBelongTeam] REJECT id=" + idCsvBelongsTeam + " : Researcher_ID is null");
        return null;
    }
    if (idTeamCsv == null) {
        System.err.println("[CsvBelongTeam] REJECT id=" + idCsvBelongsTeam + " : Team_ID is null");
        return null;
    }

    if (csvResearcher == null || csvResearcher.getIdDatabase() == null) {
        System.err.println("[CsvBelongTeam] REJECT id=" + idCsvBelongsTeam
                + " : Researcher_ID=" + idCsvResearcher + " not found / not imported");
        return null;
    }

    if (csvTeam == null || csvTeam.getIdDatabase() == null) {
        System.err.println("[CsvBelongTeam] REJECT id=" + idCsvBelongsTeam
                + " : Team_ID=" + idTeamCsv + " not found / not imported");
        return null;
    }

    Integer researcherDbId = csvResearcher.getIdDatabase();
    Integer teamDbId = csvTeam.getIdDatabase();

    BelongsTeam bt = new BelongsTeam();
    bt.setIdBelongsTeam(idCsvBelongsTeam);

    // 1) relations
    Researcher r = new Researcher();
    r.setResearcherId(researcherDbId);
    bt.setResearcher(r);

    Team t = new Team();
    t.setTeamId(teamDbId);
    bt.setTeam(t);

    // 2) FK directes si l'entité les porte (sinon Hibernate peut insérer NULL)
    try {
        bt.getClass().getMethod("setResearcherId", Integer.class).invoke(bt, researcherDbId);
    } catch (Exception ignored) {}
    try {
        bt.getClass().getMethod("setTeamId", Integer.class).invoke(bt, teamDbId);
    } catch (Exception ignored) {}

    return bt;
}


    // Clé de merge : l’ID technique du CSV/DB (stable)
    @Override
    public String getMergingKey() {
        return (idCsvBelongsTeam == null) ? "" : String.valueOf(idCsvBelongsTeam);
    }

    @Override
    public String getMergingKey(BelongsTeam entity) {
        if (entity == null) return "";
        Integer id = entity.getIdBelongsTeam();
        return id == null ? "" : String.valueOf(id);
    }

    @Override
    public void setIdDatabaseFromEntity(BelongsTeam entity) {
        // cohérent avec une PK simple
        this.setIdDatabase(entity.getIdBelongsTeam());
    }

    @Override
    public Integer getIdCsv() {
        // clé de map = Belongs_Team_ID
        return this.idCsvBelongsTeam;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCsvBelongsTeam, idCsvResearcher, idTeamCsv);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CsvBelongTeam other = (CsvBelongTeam) obj;
        return Objects.equals(idCsvBelongsTeam, other.idCsvBelongsTeam)
                && Objects.equals(idCsvResearcher, other.idCsvResearcher)
                && Objects.equals(idTeamCsv, other.idTeamCsv);
    }

    public Integer getIdCsvBelongsTeam() {
        return idCsvBelongsTeam;
    }

    public void setIdCsvBelongsTeam(Integer idCsvBelongsTeam) {
        this.idCsvBelongsTeam = idCsvBelongsTeam;
    }

    public Integer getIdCsvResearcher() {
        return idCsvResearcher;
    }

    public void setIdCsvResearcher(Integer idCsvResearcher) {
        this.idCsvResearcher = idCsvResearcher;
    }

    public Integer getIdTeamCsv() {
        return idTeamCsv;
    }

    public void setIdTeamCsv(Integer idTeamCsv) {
        this.idTeamCsv = idTeamCsv;
    }

    public GenericCsv<Researcher, Integer> getCsvResearcher() {
        return csvResearcher;
    }

    public void setCsvResearcher(GenericCsv<Researcher, Integer> csvResearcher) {
        this.csvResearcher = csvResearcher;
    }

    public GenericCsv<Team, Integer> getCsvTeam() {
        return csvTeam;
    }

    public void setCsvTeam(GenericCsv<Team, Integer> csvTeam) {
        this.csvTeam = csvTeam;
    }
    
    
}
