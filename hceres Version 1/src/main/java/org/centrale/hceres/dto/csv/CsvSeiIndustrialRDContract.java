package org.centrale.hceres.dto.csv;


import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvFieldException;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.DependentCsv;
import org.centrale.hceres.dto.csv.utils.SupportedCsvTemplate;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.SeiIndustrialRDContract;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.util.RequestParser;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;


public class CsvSeiIndustrialRDContract extends DependentCsv<Activity, Integer> {

    // 0 : id_contract (identifiant technique de la ligne CSV)
    private Integer idCsvSeiIndustrialRDContract;
    private static final int ID_CSV_SEI_INDUSTRIAL_RD_CONTRACT_ORDER = 0;

    // 1 : Contract start date (année, ex: 2016)
    private Integer contractStartYear;
    private static final int CONTRACT_START_YEAR_ORDER = 1;

    // 2 : Name of PI
    private String piName;
    private static final int PI_NAME_ORDER = 2;

    // 3 : Name of the company involved
    private String nameCompanyInvolved;
    private static final int NAME_COMPANY_INVOLVED_ORDER = 3;

    // 4 : Project title
    private String projectTitle;
    private static final int PROJECT_TITLE_ORDER = 4;

    // 5 : Amount of the agreement
    private Integer agreementAmount;
    private static final int AGREEMENT_AMOUNT_ORDER = 5;

    // 6 : Start and end dates (chaîne libre : "2018-2021", "2020/2021", etc.)
    private String startEndDates;
    private static final int START_END_DATES_ORDER = 6;

    // Dépendance : accès aux chercheurs
    private final ResearcherRepository researcherRepository;

    public CsvSeiIndustrialRDContract(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_SEI_INDUSTRIAL_RD_CONTRACT_ORDER,
                        f -> this.setIdCsvSeiIndustrialRDContract(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(CONTRACT_START_YEAR_ORDER,
                        f -> this.setContractStartYear(RequestParser.getAsInteger(csvData.get(f)))), // "2016" → Integer
                () -> CsvParserUtil.wrapCsvParseException(PI_NAME_ORDER,
                        f -> this.setPiName(RequestParser.getAsString(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(NAME_COMPANY_INVOLVED_ORDER,
                        f -> this.setNameCompanyInvolved(RequestParser.getAsString(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(PROJECT_TITLE_ORDER,
                        f -> this.setProjectTitle(RequestParser.getAsString(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(AGREEMENT_AMOUNT_ORDER,
                        f -> this.setAgreementAmount(RequestParser.getAsInteger(csvData.get(f)))),
                () -> CsvParserUtil.wrapCsvParseException(START_END_DATES_ORDER,
                        f -> this.setStartEndDates(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        // plus de dépendances CSV (on ne passe plus par CsvActivity)
    }

    @Override
    public Activity convertToEntity() {
        // 1) Créer l'Activity
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.SEI_INDUSTRIAL_R_D_CONTRACT.getId());

        // 2) Résoudre le(s) PI dans la BDD à partir de piName
        List<Researcher> matchedResearchers = resolvePiResearchersSafely();

        // Si on veut être strict : si aucun chercheur trouvé -> on ne crée rien
        if (matchedResearchers.isEmpty()) {
            // On renvoie une Activity "fantôme" avec id null -> elle ne sera pas mergée,
            // mais tu peux choisir de lever une RuntimeException si tu veux vraiment bloquer.
            return null;
        }

        activity.setResearcherList(matchedResearchers);

        // 3) Construire l'entité SeiIndustrialRDContract
        SeiIndustrialRDContract sei = new SeiIndustrialRDContract();

        // On transforme l'année en "startDate" approximative : 1er janvier de l'année
        if (this.getContractStartYear() != null) {
            java.sql.Date sqlStartDate = java.sql.Date.valueOf(this.getContractStartYear() + "-01-01");
            sei.setStartDate(sqlStartDate);
        }

        sei.setNameCompanyInvolved(this.getNameCompanyInvolved());
        sei.setProjectTitle(this.getProjectTitle());
        sei.setAgreementAmount(this.getAgreementAmount());

        // Comme "Start and end dates" est une string libre, tu peux :
        //  - soit ajouter un champ dans l'entité,
        //  - soit plus tard parser la fin pour setEndDate.
        // Pour l'instant, on ne touche pas à endDate si ton entity ne le permet pas.
        // sei.setEndDate(...);

        activity.setSeiIndustrialRDContract(sei);
        sei.setActivity(activity);

        return activity;
    }

    /**
     * Recherche robuste des chercheurs à partir de piName.
     * Exemples de piName :
     *  - "Giral"
     *  - "Guillonneau/Anegon"
     */
    private List<Researcher> resolvePiResearchersSafely() {
        List<Researcher> result = new ArrayList<>();

        if (piName == null || piName.isBlank()) {
            return result;
        }

        // Exemple : "Guillonneau/Anegon" → ["Guillonneau", "Anegon"]
        String[] parts = piName.split("/");
        for (String raw : parts) {
            String cleaned = raw.trim();

            // On enlève une éventuelle initiale du style "C. Guillonneau" / "M. Giral"
            // (si un jour tu ajoutes des initiales)
            cleaned = cleaned.replaceAll("^[A-Z]\\.?\\s+", ""); // "C. Guillonneau" → "Guillonneau"

            if (cleaned.isEmpty()) {
                continue;
            }

            // À adapter selon ta BDD : ici j'imagine une méthode :
            // List<Researcher> findByLastNameIgnoreCase(String lastName);
            List<Researcher> found = researcherRepository.findByResearcherSurname(cleaned);

            if (found != null && !found.isEmpty()) {
                result.addAll(found);
            }
        }

        return result;
    }

    // --- Clés de merge (simples, basées sur les données CSV) ---

    @Override
    public String getMergingKey() {
        // clé basée sur le CSV seul
        return (
                (piName != null ? piName : "")
                        + "_" + (contractStartYear != null ? contractStartYear : "")
                        + "_" + (nameCompanyInvolved != null ? nameCompanyInvolved : "")
                        + "_" + (projectTitle != null ? projectTitle : "")
                        + "_" + (agreementAmount != null ? agreementAmount : "")
                        + "_" + (startEndDates != null ? startEndDates : "")
        ).toLowerCase();
    }

    @Override
    public String getMergingKey(Activity entity) {
        if (entity == null) {
            return "";
        }

        // 1) PI → on prend le premier chercheur si présent
        String piPart = "";
        Collection<Researcher> researchers = entity.getResearcherList();
        if (researchers != null && !researchers.isEmpty()) {
            Researcher r = researchers.iterator().next();
            if (r != null && r.getResearcherSurname()!= null) {
                piPart = r.getResearcherSurname();
            }
        }

        // 2) Contrat
        SeiIndustrialRDContract sei = entity.getSeiIndustrialRDContract();
        String startDate = "";
        String nameCompany = "";
        String projectTitleLocal = "";
        String agreementAmountLocal = "";
        String period = "";

        if (sei != null) {
            startDate = (sei.getStartDate() != null) ? sei.getStartDate().toString() : "";
            nameCompany = (sei.getNameCompanyInvolved() != null) ? sei.getNameCompanyInvolved() : "";
            projectTitleLocal = (sei.getProjectTitle() != null) ? sei.getProjectTitle() : "";
            if (sei.getAgreementAmount() != null) {
                agreementAmountLocal = sei.getAgreementAmount().toString();
            }
            // si tu ajoutes plus tard une propriété "startEndDates", tu peux la utiliser ici.
        }

        String key = (
                piPart
                        + "_" + startDate
                        + "_" + nameCompany
                        + "_" + projectTitleLocal
                        + "_" + agreementAmountLocal
                        + "_" + period
        );

        return key.toLowerCase();
    }

    @Override
    public void setIdDatabaseFromEntity(Activity entity) {
        if (entity != null) {
            this.setIdDatabase(entity.getIdActivity());
        }
    }

    @Override
    public Integer getIdCsv() {
        return this.getIdCsvSeiIndustrialRDContract();
    }

    public Integer getIdCsvSeiIndustrialRDContract() {
        return idCsvSeiIndustrialRDContract;
    }

    public void setIdCsvSeiIndustrialRDContract(Integer idCsvSeiIndustrialRDContract) {
        this.idCsvSeiIndustrialRDContract = idCsvSeiIndustrialRDContract;
    }

    public Integer getContractStartYear() {
        return contractStartYear;
    }

    public void setContractStartYear(Integer contractStartYear) {
        this.contractStartYear = contractStartYear;
    }

    public String getPiName() {
        return piName;
    }

    public void setPiName(String piName) {
        this.piName = piName;
    }

    public String getNameCompanyInvolved() {
        return nameCompanyInvolved;
    }

    public void setNameCompanyInvolved(String nameCompanyInvolved) {
        this.nameCompanyInvolved = nameCompanyInvolved;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public Integer getAgreementAmount() {
        return agreementAmount;
    }

    public void setAgreementAmount(Integer agreementAmount) {
        this.agreementAmount = agreementAmount;
    }

    public String getStartEndDates() {
        return startEndDates;
    }

    public void setStartEndDates(String startEndDates) {
        this.startEndDates = startEndDates;
    }
    
    
}
