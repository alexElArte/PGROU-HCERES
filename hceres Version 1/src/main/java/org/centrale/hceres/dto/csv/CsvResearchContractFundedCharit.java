package org.centrale.hceres.dto.csv;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.DependentCsv;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ResearchContractFundedCharit;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.util.RequestParser;

public class CsvResearchContractFundedCharit extends DependentCsv<Activity, Integer> {

    // 0 : id_csv_research_contract_funded_charit (identifiant technique de la ligne)
    private Integer idCsvResearchContractFundedCharit;
    private static final int ID_CSV_RESEARCH_CONTRACT_FUNDED_CHARIT_ORDER = 0;

    // 1 : Year of contract award  → on en déduit dateContractAward = 01/01/année
    private Integer yearContractAward;
    private static final int YEAR_CONTRACT_AWARD_ORDER = 1;

    // 2 : Type (scrolling list) -> ID (entier)
    private Integer idType;
    private static final int ID_TYPE_ORDER = 2;

// 3 : Type (nomenclature Nov 2019) (texte, optionnel)
    private String typeNomenclature;
    private static final int TYPE_NOMENCLATURE_ORDER = 3;

    // 4 : Funding institution
    private String fundingInstitution;
    private static final int FUNDING_INSTITUTION_ORDER = 4;

    // 5 : Name of researcher (nom du PI / chercheur principal)
    private String nameResearcher;
    private static final int NAME_RESEARCHER_ORDER = 5;

    // 6 : Project title
    private String projectTitle;
    private static final int PROJECT_TITLE_ORDER = 6;

    // 7 : Start and end years (ex: "2016-2019" ou "2016/2019")
    private String startEndYears;
    private static final int START_END_YEARS_ORDER = 7;

    // 8 : durée du financement (mois) – stockée pour info
    private Integer durationMonths;
    private static final int DURATION_MONTHS_ORDER = 8;

    // 9 : Amount of grant (CRTI part)
    private Integer grantAmount;
    private static final int GRANT_AMOUNT_ORDER = 9;

    // --- Champs déjà présents dans l’entité côté Java/BD ---
    private Date dateContractAward;   // calculée à partir de yearContractAward
    private Integer startYear;        // calculé à partir de startEndYears
    private Integer endYear;          // calculé à partir de startEndYears
    

    // --- Dépendances (en base) ---
    private final ResearcherRepository researcherRepository;

    public CsvResearchContractFundedCharit(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

    // ===========================
    //   CSV -> champs simples
    // ===========================
    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                // 0 : id CSV technique
                () -> CsvParserUtil.wrapCsvParseException(
                        ID_CSV_RESEARCH_CONTRACT_FUNDED_CHARIT_ORDER,
                        f -> this.setIdCsvResearchContractFundedCharit(
                                RequestParser.getAsInteger(csvData.get(f)))
                ),
                // 1 : Year of contract award (YYYY)
                () -> CsvParserUtil.wrapCsvParseException(
                        YEAR_CONTRACT_AWARD_ORDER,
                        f -> {
                            Integer year = RequestParser.getAsInteger(csvData.get(f));
                            this.setYearContractAward(year);
                            if (year != null) {
                                // 1er janvier de l’année
                                this.setDateContractAward(
                                        Date.valueOf(year + "-01-01")
                                );
                            }
                        }
                ),
                // 2 : Type (scrolling list) -> idType (Integer)
                () -> CsvParserUtil.wrapCsvParseException(
                        ID_TYPE_ORDER,
                        f -> this.setIdType(RequestParser.getAsInteger(csvData.get(f)))
                ),
                // 3 : Type (nomenclature Nov 2019)
                () -> CsvParserUtil.wrapCsvParseException(
                        TYPE_NOMENCLATURE_ORDER,
                        f -> this.setTypeNomenclature(RequestParser.getAsString(csvData.get(f)))
                ),
                // 4 : Funding institution
                () -> CsvParserUtil.wrapCsvParseException(
                        FUNDING_INSTITUTION_ORDER,
                        f -> this.setFundingInstitution(RequestParser.getAsString(csvData.get(f)))
                ),
                // 5 : Name of researcher
                () -> CsvParserUtil.wrapCsvParseException(
                        NAME_RESEARCHER_ORDER,
                        f -> this.setNameResearcher(RequestParser.getAsString(csvData.get(f)))
                ),
                // 6 : Project title
                () -> CsvParserUtil.wrapCsvParseException(
                        PROJECT_TITLE_ORDER,
                        f -> this.setProjectTitle(RequestParser.getAsString(csvData.get(f)))
                ),
                // 7 : Start and end years → startYear / endYear
                () -> CsvParserUtil.wrapCsvParseException(
                        START_END_YEARS_ORDER,
                        f -> {
                            String period = RequestParser.getAsString(csvData.get(f));
                            this.setStartEndYears(period);

                            if (period != null) {
                                String cleaned = period.trim();
                                if (!cleaned.isEmpty()) {
                                    // 2016-2019 ou 2016/2019 → normaliser
                                    String normalized = cleaned.replace('/', '-');
                                    String[] parts = normalized.split("-");
                                    if (parts.length >= 2) {
                                        try {
                                            this.setStartYear(Integer.parseInt(parts[0].trim()));
                                        } catch (NumberFormatException ignored) {
                                        }
                                        try {
                                            this.setEndYear(Integer.parseInt(parts[1].trim()));
                                        } catch (NumberFormatException ignored) {
                                        }
                                    }
                                }
                            }
                        }
                ),
                // 8 : durée du financement (mois) – nullable
                () -> CsvParserUtil.wrapCsvParseException(
                        DURATION_MONTHS_ORDER,
                        f -> {
                            Object raw = csvData.get(f);
                            if (raw == null) {
                                this.setDurationMonths(null);
                            } else {
                                Integer value = RequestParser.getAsInteger(raw);
                                this.setDurationMonths(value);
                            }
                        }
                ),
                // 9 : Amount of grant (CRTI part)
                () -> CsvParserUtil.wrapCsvParseException(
                        GRANT_AMOUNT_ORDER,
                        f -> this.setGrantAmount(RequestParser.getAsInteger(csvData.get(f)))
                )
        );
    }

    // ===========================
    //   Dépendances CSV
    // ===========================
    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        // plus de dépendance CSV (Activity). L’Activity est créée directement dans convertToEntity(),
        // et les chercheurs sont résolus via researcherRepository.
    }

    // ===========================
    //   Résolution des chercheurs
    // ===========================
    /**
     * À partir d'une chaîne brute type "Giral / Foucher" (colonne "Name of
     * researcher"), on retrouve en BDD les chercheurs correspondants (par nom
     * de famille). - Si aucun trouvé → ignoré - Si au moins un nom est
     * introuvable ou ambigu → on annule tout (tout ou rien)
     */
    private List<Researcher> resolveResearchersFromNames(String rawNames) {
        if (rawNames == null || rawNames.isBlank()) {
            return Collections.emptyList();
        }

        List<Researcher> result = new ArrayList<>();
        boolean hasError = false;

        // même logique que pour TrainingThesis : séparation sur "/"
        String[] parts = rawNames.split("/");

        for (String part : parts) {
            String surname = part.trim(); // on suppose que la colonne contient surtout les noms de famille
            if (surname.isEmpty()) {
                continue;
            }

            List<Researcher> matches = researcherRepository.findByResearcherSurname(surname);

            if (matches.size() == 1) {
                result.add(matches.get(0));
            } else if (matches.isEmpty()) {
                hasError = true;
                System.out.println("[CSV ResearchContractFundedCharit] Aucun chercheur trouvé pour : '" + surname + "'");
            } else {
                hasError = true;
                System.out.println("[CSV ResearchContractFundedCharit] Ambigu : "
                        + matches.size() + " chercheurs pour : '" + surname + "'");
            }
        }

        if (hasError) {
            System.out.println("[CSV ResearchContractFundedCharit] Au moins un chercheur introuvable/ambigu → aucun associé.");
            return Collections.emptyList();
        }

        return result;
    }

    // ===========================
    //   Conversion en entité
    // ===========================
    @Override
    public Activity convertToEntity() {
        // 1) Résoudre les chercheurs à partir de Name of researcher
        List<Researcher> matchedResearchers = resolveResearchersFromNames(this.nameResearcher);

        if (matchedResearchers == null || matchedResearchers.isEmpty()) {
            System.out.println("[CSV ResearchContractFundedCharit] Aucun chercheur valide trouvé pour '"
                    + this.nameResearcher + "' -> ligne ignorée.");
            return null;
        }

        // 2) Créer l'Activity avec les chercheurs
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST.getId());
        activity.setResearcherList(matchedResearchers);

        // 3) Construire l'entité de contrat
        ResearchContractFundedCharit rc = new ResearchContractFundedCharit();
        rc.setDateContractAward(this.getDateContractAward());
        rc.setFundingInstitution(this.getFundingInstitution());
        rc.setProjectTitle(this.getProjectTitle());
        rc.setStartYear(this.getStartYear());
        rc.setEndYear(this.getEndYear());
        rc.setGrantAmount(this.getGrantAmount());
        rc.setTypeResearchContractId(this.getIdType());
        rc.setIdCsvResearchContractFundedCharit(this.getIdCsvResearchContractFundedCharit());
        activity.setResearchContractFundedCharit(rc);
        rc.setActivity(activity);

        return activity;
    }

    // ===========================
    //   Clés de merge
    // ===========================
    @Override
    public String getMergingKey() {
        return "research_contract_charit_csv_" + this.getIdCsvResearchContractFundedCharit();
    }

    @Override
public String getMergingKey(Activity entity) {
    if (entity == null || entity.getResearchContractFundedCharit() == null) return "";
    Integer idCsv = entity.getResearchContractFundedCharit().getIdCsvResearchContractFundedCharit();
    if (idCsv == null) return "";
    return "research_contract_charit_csv_" + idCsv;
}


    // ===========================
    //   Id BD / Id CSV
    // ===========================
    @Override
    public void setIdDatabaseFromEntity(Activity entity) {
        this.setIdDatabase(entity.getIdActivity());
    }

    @Override
    public Integer getIdCsv() {
        return this.getIdCsvResearchContractFundedCharit();
    }

    // ===========================
    //   Getters / Setters
    // ===========================
    public Integer getIdCsvResearchContractFundedCharit() {
        return idCsvResearchContractFundedCharit;
    }

    public void setIdCsvResearchContractFundedCharit(Integer idCsvResearchContractFundedCharit) {
        this.idCsvResearchContractFundedCharit = idCsvResearchContractFundedCharit;
    }

    public Integer getYearContractAward() {
        return yearContractAward;
    }

    public void setYearContractAward(Integer yearContractAward) {
        this.yearContractAward = yearContractAward;
    }

    public String getTypeNomenclature() {
        return typeNomenclature;
    }

    public void setTypeNomenclature(String typeNomenclature) {
        this.typeNomenclature = typeNomenclature;
    }

    public Date getDateContractAward() {
        return dateContractAward;
    }

    public void setDateContractAward(Date dateContractAward) {
        this.dateContractAward = dateContractAward;
    }

    public String getFundingInstitution() {
        return fundingInstitution;
    }

    public void setFundingInstitution(String fundingInstitution) {
        this.fundingInstitution = fundingInstitution;
    }

    public String getNameResearcher() {
        return nameResearcher;
    }

    public void setNameResearcher(String nameResearcher) {
        this.nameResearcher = nameResearcher;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getStartEndYears() {
        return startEndYears;
    }

    public void setStartEndYears(String startEndYears) {
        this.startEndYears = startEndYears;
    }

    public Integer getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(Integer durationMonths) {
        this.durationMonths = durationMonths;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public Integer getEndYear() {
        return endYear;
    }

    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }

    public Integer getGrantAmount() {
        return grantAmount;
    }

    public void setGrantAmount(Integer grantAmount) {
        this.grantAmount = grantAmount;
    }

    public Integer getIdType() {
        return idType;
    }

    public void setIdType(Integer idType) {
        this.idType = idType;
    }
    

}
