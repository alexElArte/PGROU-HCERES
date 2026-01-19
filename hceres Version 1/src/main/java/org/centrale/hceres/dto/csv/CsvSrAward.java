package org.centrale.hceres.dto.csv;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.DependentCsv;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.SrAward;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.util.RequestParser;

public class CsvSrAward extends DependentCsv<Activity, Integer> {

    // CSV columns:
    // 0: id_activity (utilisé comme id CSV technique)
    private Integer idCsvSrAward;
    private static final int ID_CSV_SR_AWARD_ORDER = 0;

    // 1: Year of award / year of completion (texte : "2015", "2015-2019", "since 2015", ...)
    private String yearAwardRaw;
    private static final int YEAR_AWARD_RAW_ORDER = 1;

    // 2: Name of researcher (ex: "Guillonneau / Anegon")
    private String nameResearcher;
    private static final int NAME_RESEARCHER_ORDER = 2;

    // 3: Name of awardee (optionnel)
    private String awardeeName;
    private static final int AWARDEE_NAME_ORDER = 3;

    // 4: Titre EN (description)
    private String titleEn;
    private static final int TITLE_EN_ORDER = 4;

    // computed
    private Date awardDate; // calculée si on peut extraire une année

    // dependency (BDD)
    private final ResearcherRepository researcherRepository;

    public CsvSrAward(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(
                        ID_CSV_SR_AWARD_ORDER,
                        f -> this.setIdCsvSrAward(RequestParser.getAsInteger(csvData.get(f)))
                ),
                () -> CsvParserUtil.wrapCsvParseException(
                        YEAR_AWARD_RAW_ORDER,
                        f -> {
                            String raw = RequestParser.getAsString(csvData.get(f));
                            this.setYearAwardRaw(raw);
                            this.setAwardDate(extractAwardDateFromRawYear(raw)); // nullable
                        }
                ),
                () -> CsvParserUtil.wrapCsvParseException(
                        NAME_RESEARCHER_ORDER,
                        f -> this.setNameResearcher(RequestParser.getAsString(csvData.get(f)))
                ),
                () -> CsvParserUtil.wrapCsvParseException(
                        AWARDEE_NAME_ORDER,
                        f -> this.setAwardeeName(RequestParser.getAsString(csvData.get(f)))
                ),
                () -> CsvParserUtil.wrapCsvParseException(
                        TITLE_EN_ORDER,
                        f -> this.setTitleEn(RequestParser.getAsString(csvData.get(f)))
                )
        );
    }

    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        // plus de dépendance CSV (Activity). Les chercheurs sont résolus en base dans convertToEntity().
    }

    /**
     * Essaie d'extraire une année (YYYY) depuis un texte du type : "2015",
     * "2015-2019", "since 2015", "2018-present", etc. Retourne 01/01/YYYY si
     * trouvée, sinon null.
     */
    private Date extractAwardDateFromRawYear(String raw) {
        if (raw == null) {
            return null;
        }
        String s = raw.trim();
        if (s.isEmpty()) {
            return null;
        }

        // Cherche la première occurrence d'une année sur 4 chiffres
        // (simple et robuste sans regex lourde)
        for (int i = 0; i <= s.length() - 4; i++) {
            String sub = s.substring(i, i + 4);
            if (sub.chars().allMatch(Character::isDigit)) {
                try {
                    int year = Integer.parseInt(sub);
                    // garde-fou minimal (optionnel)
                    if (year >= 1900 && year <= 2100) {
                        return Date.valueOf(year + "-01-01");
                    }
                } catch (NumberFormatException ignored) {
                }
            }
        }
        return null;
    }

    /**
     * Résout les chercheurs depuis "Name of researcher" avec séparation sur
     * "/". Tout-ou-rien : si un nom est introuvable ou ambigu => aucun associé.
     */
    private List<Researcher> resolveResearchersFromNames(String rawNames) {
        if (rawNames == null || rawNames.isBlank()) {
            return Collections.emptyList();
        }

        List<Researcher> result = new ArrayList<>();
        boolean hasError = false;

        String[] parts = rawNames.split("/");

        for (String part : parts) {
            String surname = part.trim();
            if (surname.isEmpty()) {
                continue;
            }

            List<Researcher> matches = researcherRepository.findByResearcherSurname(surname);

            if (matches.size() == 1) {
                result.add(matches.get(0));
            } else if (matches.isEmpty()) {
                hasError = true;
                System.out.println("[CSV SrAward] Aucun chercheur trouvé pour : '" + surname + "'");
            } else {
                hasError = true;
                System.out.println("[CSV SrAward] Ambigu : " + matches.size() + " chercheurs pour : '" + surname + "'");
            }
        }

        if (hasError) {
            System.out.println("[CSV SrAward] Au moins un chercheur introuvable/ambigu → aucun associé.");
            return Collections.emptyList();
        }

        return result;
    }

    @Override
    public Activity convertToEntity() {
        // 1) Résoudre les chercheurs
        List<Researcher> matchedResearchers = resolveResearchersFromNames(this.nameResearcher);

        if (matchedResearchers == null || matchedResearchers.isEmpty()) {
            System.out.println("[CSV SrAward] Aucun chercheur valide trouvé pour '" + this.nameResearcher + "' -> ligne ignorée.");
            return null;
        }

        // 2) Créer Activity
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.SR_AWARD.getId());
        activity.setResearcherList(matchedResearchers);

        // 3) Créer SrAward
        SrAward srAward = new SrAward();
        srAward.setIdCsvSrAward(this.getIdCsvSrAward());
        srAward.setAwardDate(this.getAwardDate());           // nullable
        srAward.setAwardeeName(this.getAwardeeName());       // nullable
        srAward.setDescription(this.getTitleEn());           // Titre EN

        activity.setSrAward(srAward);
        srAward.setActivity(activity);

        return activity;
    }

    // ======== Clés de merge ========
    @Override
    public String getMergingKey() {
        return "sr_award_csv_" + this.getIdCsvSrAward();
    }

    @Override
    public String getMergingKey(Activity entity) {
        if (entity == null || entity.getSrAward() == null) {
            return "";
        }
        Integer idCsv = entity.getSrAward().getIdCsvSrAward();
        if (idCsv == null) {
            return "";
        }
        return "sr_award_csv_" + idCsv;
    }

    @Override
    public void setIdDatabaseFromEntity(Activity entity) {
        this.setIdDatabase(entity.getIdActivity());
    }

    @Override
    public Integer getIdCsv() {
        return this.getIdCsvSrAward();
    }

    // ======== Getters / Setters ========
    public Integer getIdCsvSrAward() {
        return idCsvSrAward;
    }

    public void setIdCsvSrAward(Integer idCsvSrAward) {
        this.idCsvSrAward = idCsvSrAward;
    }

    public String getYearAwardRaw() {
        return yearAwardRaw;
    }

    public void setYearAwardRaw(String yearAwardRaw) {
        this.yearAwardRaw = yearAwardRaw;
    }

    public String getNameResearcher() {
        return nameResearcher;
    }

    public void setNameResearcher(String nameResearcher) {
        this.nameResearcher = nameResearcher;
    }

    public String getAwardeeName() {
        return awardeeName;
    }

    public void setAwardeeName(String awardeeName) {
        this.awardeeName = awardeeName;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public Date getAwardDate() {
        return awardDate;
    }

    public void setAwardDate(Date awardDate) {
        this.awardDate = awardDate;
    }
}
