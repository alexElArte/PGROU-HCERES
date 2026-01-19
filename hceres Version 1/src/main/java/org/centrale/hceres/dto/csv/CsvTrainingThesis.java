package org.centrale.hceres.dto.csv;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.TrainingThesis;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.util.RequestParser;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.centrale.hceres.dto.csv.utils.DependentCsv;
import org.centrale.hceres.dto.csv.utils.SupportedCsvTemplate;
import org.centrale.hceres.items.PhdStudent;
import org.centrale.hceres.items.Nationality;
import org.centrale.hceres.repository.NationalityRepository;
import org.centrale.hceres.repository.ResearcherRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CsvTrainingThesis extends DependentCsv<Activity, Integer> {

    // 0 : id_csv_training_thesis (identifiant technique de la ligne)
    private Integer idCsvTrainingThesis;
    private static final int ID_CSV_TRAINING_THESIS_ORDER = 0;

// 1 : id_researcher (ID BD du chercheur)
    private Integer idResearcher;

// 2 : name_student
    private String nameStudent;
    private static final int NAME_STUDENT_ORDER = 1;

// 3 : surname_student
    private String surnameStudent;
    private static final int SURNAME_STUDENT_ORDER = 2;

// 4 : nationality
    private String nationality;
    private static final int NATIONALITY_ORDER = 3;

// 5 : id_background
    private Integer idBackground;
    private static final int ID_BACKGROUND_ORDER = 4;

// 6 : start_date
    private java.sql.Date startDate;
    private static final int START_DATE_ORDER = 5;

// 7 : defense_date
    private java.sql.Date defenseDate;
    private static final int DEFENSE_DATE_ORDER = 6;

// 8 : duration_thesis
    private Integer durationThesis;
    private static final int DURATION_THESIS_ORDER = 7;

// 9 : name_director
    private String nameDirector;
    private static final int NAME_DIRECTOR_ORDER = 8;

// 10 : associated_funding
    private String associatedFunding;
    private static final int ASSOCIATED_FUNDING_ORDER = 9;

// 11 : nb_original_articles
    private Integer nbOriginalArticles;
    private static final int NB_ORIGINAL_ARTICLES_ORDER = 10;

// 12 : nb_original_articles_1_2_position
    private Integer nbOriginalArticlesFirstSecondPosition;
    private static final int NB_ORIGINAL_ARTICLES_1_2_POSITION_ORDER = 11;

// 13 : ref_publications
    private String refPublications;
    private static final int REF_PUBLICATIONS_ORDER = 12;

// 14 : becoming_student
    private String becomingStudent;
    private static final int BECOMING_STUDENT_ORDER = 13;

// --- Dépendances ---
    private ResearcherRepository researcherRepository;
    private NationalityRepository nationalityRepository;

// ➜ SUPPRIMER :
/*
private CsvActivity csvActivity;
private Map<Integer, CsvActivity> activityIdCsvMap;
     */
    public CsvTrainingThesis(ResearcherRepository researcherRepository,
            NationalityRepository nationalityRepository) {
        this.researcherRepository = researcherRepository;
        this.nationalityRepository = nationalityRepository;
    }

    // --- Lecture des données CSV (sans dépendances) ---
    @Override
public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {

    CsvParserUtil.wrapCsvAllFieldExceptions(

        () -> CsvParserUtil.wrapCsvParseException(
                ID_CSV_TRAINING_THESIS_ORDER,
                f -> this.setIdCsvTrainingThesis(
                        RequestParser.getAsInteger(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                NAME_STUDENT_ORDER,
                f -> this.setNameStudent(RequestParser.getAsString(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                SURNAME_STUDENT_ORDER,
                f -> this.setSurnameStudent(RequestParser.getAsString(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                NATIONALITY_ORDER,
                f -> this.setNationality(RequestParser.getAsString(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                ID_BACKGROUND_ORDER,
                f -> {
                    try {
                        String raw = RequestParser.getAsString(csvData.get(f));
                        if (raw == null || raw.trim().isEmpty()
                                || raw.equalsIgnoreCase("NA")
                                || raw.equalsIgnoreCase("N/A")) {
                            this.setIdBackground(null);
                        } else {
                            this.setIdBackground(RequestParser.getAsInteger(raw));
                        }
                    } catch (Exception e) {
                        this.setIdBackground(null);
                    }
                }
        ),

        // start_date : volontairement STRICT
        () -> CsvParserUtil.wrapCsvParseException(
                START_DATE_ORDER,
                f -> this.setStartDate(
                        RequestParser.getAsDateCsvFormat(csvData.get(f)))
        ),

        // defense_date : NA / vide / ongoing -> null
        () -> CsvParserUtil.wrapCsvParseException(
                DEFENSE_DATE_ORDER,
                f -> {
                    try {
                        String raw = RequestParser.getAsString(csvData.get(f));
                        if (raw == null) {
                            this.setDefenseDate(null);
                        } else {
                            raw = raw.trim();
                            if (raw.isEmpty()
                                    || raw.equalsIgnoreCase("NA")
                                    || raw.equalsIgnoreCase("N/A")
                                    || raw.equalsIgnoreCase("ongoing")
                                    || raw.equalsIgnoreCase("on going")) {
                                this.setDefenseDate(null);
                            } else {
                                this.setDefenseDate(
                                        RequestParser.getAsDateCsvFormat(raw));
                            }
                        }
                    } catch (Exception e) {
                        this.setDefenseDate(null);
                    }
                }
        ),

        // duration_thesis : NA / vide -> null
        () -> CsvParserUtil.wrapCsvParseException(
                DURATION_THESIS_ORDER,
                f -> {
                    try {
                        String raw = RequestParser.getAsString(csvData.get(f));
                        if (raw == null || raw.trim().isEmpty()
                                || raw.equalsIgnoreCase("NA")
                                || raw.equalsIgnoreCase("N/A")) {
                            this.setDurationThesis(null);
                        } else {
                            this.setDurationThesis(
                                    RequestParser.getAsInteger(raw));
                        }
                    } catch (Exception e) {
                        this.setDurationThesis(null);
                    }
                }
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                NAME_DIRECTOR_ORDER,
                f -> this.setNameDirector(RequestParser.getAsString(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                ASSOCIATED_FUNDING_ORDER,
                f -> this.setAssociatedFunding(RequestParser.getAsString(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                NB_ORIGINAL_ARTICLES_ORDER,
                f -> {
                    try {
                        String raw = RequestParser.getAsString(csvData.get(f));
                        if (raw == null || raw.trim().isEmpty()
                                || raw.equalsIgnoreCase("NA")
                                || raw.equalsIgnoreCase("N/A")) {
                            this.setNbOriginalArticles(null);
                        } else {
                            this.setNbOriginalArticles(
                                    RequestParser.getAsInteger(raw));
                        }
                    } catch (Exception e) {
                        this.setNbOriginalArticles(null);
                    }
                }
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                NB_ORIGINAL_ARTICLES_1_2_POSITION_ORDER,
                f -> {
                    try {
                        String raw = RequestParser.getAsString(csvData.get(f));
                        if (raw == null || raw.trim().isEmpty()
                                || raw.equalsIgnoreCase("NA")
                                || raw.equalsIgnoreCase("N/A")) {
                            this.setNbOriginalArticlesFirstSecondPosition(null);
                        } else {
                            this.setNbOriginalArticlesFirstSecondPosition(
                                    RequestParser.getAsInteger(raw));
                        }
                    } catch (Exception e) {
                        this.setNbOriginalArticlesFirstSecondPosition(null);
                    }
                }
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                REF_PUBLICATIONS_ORDER,
                f -> this.setRefPublications(RequestParser.getAsString(csvData.get(f)))
        ),

        () -> CsvParserUtil.wrapCsvParseException(
                BECOMING_STUDENT_ORDER,
                f -> this.setBecomingStudent(RequestParser.getAsString(csvData.get(f)))
        )
    );
}



    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        // plus de dépendance CSV (Activity), tout est résolu en base (Researcher) dans convertToEntity()
    }

    /**
     * À partir d'une chaîne brute type "Giral / Foucher", on retrouve en BDD
     * les chercheurs correspondants (par nom de famille). - Si aucun trouvé →
     * ignoré - Si plusieurs trouvés → ignoré (cas ambigu)
     */
    private List<Researcher> resolveResearchersFromDirectorNames(String rawNames) {
        if (rawNames == null || rawNames.isBlank()) {
            return Collections.emptyList();
        }

        List<Researcher> result = new ArrayList<>();
        boolean hasError = false; // dès qu'un nom pose problème → tout est annulé

        String[] parts = rawNames.split("/");

        for (String part : parts) {
            String surname = part.trim(); // "Giral", "Foucher", etc.
            if (surname.isEmpty()) {
                continue;
            }

            List<Researcher> matches
                    = researcherRepository.findByResearcherSurname(surname);

            if (matches.size() == 1) {
                // OK
                result.add(matches.get(0));
            } else if (matches.isEmpty()) {
                // aucun trouvé
                hasError = true;
                System.out.println("[CSV TrainingThesis] Aucun chercheur trouvé pour : '" + surname + "'");
            } else {
                // plusieurs trouvés
                hasError = true;
                System.out.println("[CSV TrainingThesis] Ambigu : "
                        + matches.size() + " chercheurs pour : '" + surname + "'");
            }
        }

        // ⚠️ si au moins un nom est problématique → on ne renvoie rien
        if (hasError) {
            System.out.println("[CSV TrainingThesis] Au moins un directeur introuvable/ambigu → aucun chercheur associé.");
            return Collections.emptyList();
        }

        return result;
    }

    @Override
    public Activity convertToEntity() {
        // 1) Résoudre les chercheurs à partir de nameDirector ("Giral / Foucher")
        List<Researcher> matchedResearchers = resolveResearchersFromDirectorNames(this.nameDirector);

        // Cas "tout ou rien" : si aucun chercheur valide => on ne crée pas l'Activity
        if (matchedResearchers == null || matchedResearchers.isEmpty()) {
            System.out.println("[CSV TrainingThesis] Aucun chercheur valide trouvé pour '"
                    + this.nameDirector + "' -> ligne ignorée.");
            return null;
        }

        // 2) Créer l’Activity seulement si on a des chercheurs
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.TRAINING_THESIS_PUBLICATION.getId());
        activity.setResearcherList(matchedResearchers);

        // 3) Construire TrainingThesis comme avant
        TrainingThesis tt = new TrainingThesis();

        tt.setThesisStart(this.getStartDate());
        tt.setThesisDefenseDate(this.getDefenseDate());
        tt.setThesisDuration(this.getDurationThesis() != null ? this.getDurationThesis() : 0);
        tt.setThesisMainFunding(this.getAssociatedFunding());
        tt.setThesisNumberArticles(this.getNbOriginalArticles());
        tt.setThesisNumberArticlesFirstSecondPosition(this.getNbOriginalArticlesFirstSecondPosition());
        tt.setThesisArticlesFirstSecondPositionReferences(this.getRefPublications());
        tt.setThesisFutur(this.getBecomingStudent());

        PhdStudent phd = new PhdStudent();
        phd.setPhdStudentName(this.getNameStudent());
        phd.setPhdStudentSurname(this.getSurnameStudent());

        if (this.getNationality() != null && !this.getNationality().isBlank()) {
            String natName = this.getNationality().trim();
            nationalityRepository.findByNationalityName(natName)
                    .ifPresent(phd::setNationalityId);
        }

        tt.setPhdStudentId(phd);
        activity.setTrainingThesis(tt);
        tt.setActivity(activity);

        return activity;
    }

    // --- Clé de merge ---
    @Override
    public String getMergingKey() {
        // clé unique basée sur l'id CSV (unique dans le fichier)
        return "training_thesis_csv_" + this.getIdCsvTrainingThesis();
    }

    @Override
    public String getMergingKey(Activity entity) {
        if (entity == null || entity.getIdActivity() == null) {
            return "";
        }
        return "training_thesis_db_" + entity.getIdActivity();
    }

    // --- Id BD / Id CSV ---
    @Override
    public void setIdDatabaseFromEntity(Activity entity) {
        this.setIdDatabase(entity.getIdActivity());
    }

    @Override
    public Integer getIdCsv() {
        return this.getIdCsvTrainingThesis();
    }

    public Integer getIdCsvTrainingThesis() {
        return idCsvTrainingThesis;
    }

    public void setIdCsvTrainingThesis(Integer idCsvTrainingThesis) {
        this.idCsvTrainingThesis = idCsvTrainingThesis;
    }

    public String getNameStudent() {
        return nameStudent;
    }

    public void setNameStudent(String nameStudent) {
        this.nameStudent = nameStudent;
    }

    public String getSurnameStudent() {
        return surnameStudent;
    }

    public void setSurnameStudent(String surnameStudent) {
        this.surnameStudent = surnameStudent;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Integer getIdBackground() {
        return idBackground;
    }

    public void setIdBackground(Integer idBackground) {
        this.idBackground = idBackground;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDefenseDate() {
        return defenseDate;
    }

    public void setDefenseDate(Date defenseDate) {
        this.defenseDate = defenseDate;
    }

    public Integer getDurationThesis() {
        return durationThesis;
    }

    public void setDurationThesis(Integer durationThesis) {
        this.durationThesis = durationThesis;
    }

    public String getNameDirector() {
        return nameDirector;
    }

    public void setNameDirector(String nameDirector) {
        this.nameDirector = nameDirector;
    }

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public Integer getNbOriginalArticles() {
        return nbOriginalArticles;
    }

    public void setNbOriginalArticles(Integer nbOriginalArticles) {
        this.nbOriginalArticles = nbOriginalArticles;
    }

    public Integer getNbOriginalArticlesFirstSecondPosition() {
        return nbOriginalArticlesFirstSecondPosition;
    }

    public void setNbOriginalArticlesFirstSecondPosition(Integer nbOriginalArticlesFirstSecondPosition) {
        this.nbOriginalArticlesFirstSecondPosition = nbOriginalArticlesFirstSecondPosition;
    }

    public String getRefPublications() {
        return refPublications;
    }

    public void setRefPublications(String refPublications) {
        this.refPublications = refPublications;
    }

    public String getBecomingStudent() {
        return becomingStudent;
    }

    public void setBecomingStudent(String becomingStudent) {
        this.becomingStudent = becomingStudent;
    }

    public NationalityRepository getNationalityRepository() {
        return nationalityRepository;
    }

    public void setNationalityRepository(NationalityRepository nationalityRepository) {
        this.nationalityRepository = nationalityRepository;
    }

    public Integer getIdResearcher() {
        return idResearcher;
    }

    public void setIdResearcher(Integer idResearcher) {
        this.idResearcher = idResearcher;
    }

    public ResearcherRepository getResearcherRepository() {
        return researcherRepository;
    }

    public void setResearcherRepository(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

}
