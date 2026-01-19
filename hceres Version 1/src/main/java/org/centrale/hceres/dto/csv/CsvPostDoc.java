package org.centrale.hceres.dto.csv;

import org.centrale.hceres.dto.csv.utils.CsvAllFieldExceptions;
import org.centrale.hceres.dto.csv.utils.CsvParserUtil;
import org.centrale.hceres.dto.csv.utils.DependentCsv;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.PostDoc;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ResearcherRepository;
import org.centrale.hceres.util.RequestParser;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CsvPostDoc extends DependentCsv<Activity, Integer> {

    // 0 : id_csv_postdoc (identifiant technique CSV, pas l'idActivity BD)
    private Integer idCsvPostDoc;
    private static final int ID_CSV_POST_DOC_ORDER = 0;

    // 1 : Name of the post-doc/ senior scientist
    private String postdocOrSeniorName;
    private static final int POSTDOC_OR_SENIOR_NAME_ORDER = 1;

    // 2 : Arrival date (EN)
    private java.sql.Date arrivalDate;
    private static final int ARRIVAL_DATE_ORDER = 2;

    // 3 : Departure date
    private java.sql.Date departureDate;
    private static final int DEPARTURE_DATE_ORDER = 3;

    // 4 : Duration (non utilisée dans l'entité pour l’instant)
    private String duration;
    private static final int DURATION_ORDER = 4;

    // 5 : Name of the supervisor
    private String supervisorName;
    private static final int SUPERVISOR_NAME_ORDER = 5;

    // 6 : type (scrolling list) – non utilisé pour l’instant
    private String type;
    private static final int TYPE_ORDER = 6;

    // 7 : nationality – non utilisée pour l’instant
    private String nationality;
    private static final int NATIONALITY_ORDER = 7;

    // 8 : original lab
    private String originalLab;
    private static final int ORIGINAL_LAB_ORDER = 8;

    // 9 : associated funding
    private String associatedFunding;
    private static final int ASSOCIATED_FUNDING_ORDER = 9;

    // 10 : reference of the associated publication(s)
    private String associatedPublicationRef;
    private static final int ASSOCIATED_PUBLICATION_REF_ORDER = 10;

    // 11 : ref simplifiée
    private String publicationSimplifiedReference;
    private static final int PUBLICATION_SIMPLIFIED_REFERENCE_ORDER = 11;

    // --- Dépendances BDD ---
    private final ResearcherRepository researcherRepository;

    public CsvPostDoc(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

    // ===========================
    //   CSV -> champs simples
    // ===========================
    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_POST_DOC_ORDER,
                        f -> this.setIdCsvPostDoc(RequestParser.getAsInteger(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(POSTDOC_OR_SENIOR_NAME_ORDER,
                        f -> this.setPostdocOrSeniorName(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(ARRIVAL_DATE_ORDER,
                        f -> this.setArrivalDate(RequestParser.getAsDateCsvFormat(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(DEPARTURE_DATE_ORDER, f -> {
                    String raw = RequestParser.getAsString(csvData.get(f));
                    if (raw == null) {
                        this.setDepartureDate(null);
                    } else {
                        raw = raw.trim();
                        if (raw.isEmpty()
                                || raw.equalsIgnoreCase("ongoing")
                                || raw.equalsIgnoreCase("on going")) {
                            // "en cours" => pas de date de fin
                            this.setDepartureDate(null);
                        } else {
                            this.setDepartureDate(RequestParser.getAsDateCsvFormat(raw));
                        }
                    }
                }),

                () -> CsvParserUtil.wrapCsvParseException(DURATION_ORDER,
                        f -> this.setDuration(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(SUPERVISOR_NAME_ORDER,
                        f -> this.setSupervisorName(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(TYPE_ORDER,
                        f -> this.setType(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(NATIONALITY_ORDER,
                        f -> this.setNationality(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(ORIGINAL_LAB_ORDER,
                        f -> this.setOriginalLab(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(ASSOCIATED_FUNDING_ORDER,
                        f -> this.setAssociatedFunding(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(ASSOCIATED_PUBLICATION_REF_ORDER,
                        f -> this.setAssociatedPublicationRef(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(PUBLICATION_SIMPLIFIED_REFERENCE_ORDER,
                        f -> this.setPublicationSimplifiedReference(RequestParser.getAsString(csvData.get(f))))
        );
    }

    // ===========================
    //   Dépendances CSV
    // ===========================
    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        // On résout tout dans convertToEntity via la BDD (ResearcherRepository).
    }

    // ===========================
    //   Conversion en entité
    // ===========================
    @Override
    public Activity convertToEntity() {

        // --- 1) Résolution stricte des superviseurs ---
        List<Researcher> supervisors = resolveSupervisorsStrictOrFail();

        // Si null => on SKIP la ligne => pas d'insertion
        if (supervisors == null || supervisors.isEmpty()) {
            return null;
        }

        // --- 2) Création Activity ---
        Activity activity = new Activity();
        activity.setIdTypeActivity(TypeActivityId.POST_DOC.getId());

        // IMPORTANT: jamais null
        activity.setResearcherList(new ArrayList<>(supervisors));

        // --- 3) Création PostDoc ---
        PostDoc postDoc = new PostDoc();
        postDoc.setNamePostDoc(this.getPostdocOrSeniorName());
        postDoc.setArrivalDate(this.getArrivalDate());
        postDoc.setDepartureDate(this.getDepartureDate());
        postDoc.setNameSupervisor(this.getSupervisorName());
        postDoc.setOriginalLab(this.getOriginalLab());
        postDoc.setAssociatedFunding(this.getAssociatedFunding());

        // NB: tu avais mis publicationSimplifiedReference dans AssociatedPubliRef
        // garde ce que tu veux ici : simplifié ou "associatedPublicationRef"
        postDoc.setAssociatedPubliRef(this.getPublicationSimplifiedReference());

        activity.setPostDoc(postDoc);
        postDoc.setActivity(activity);

        return activity;
    }

    // ===========================
    //   Helpers résolution superviseurs
    // ===========================
    /**
     * "Guillonneau / Anegon" -> ["Guillonneau", "Anegon"]
     * "F. Fakhouri" -> ["Fakhouri"]
     */
    private List<String> extractSupervisorSurnames() {
        if (this.supervisorName == null || this.supervisorName.isBlank()) {
            return Collections.emptyList();
        }

        List<String> surnames = new ArrayList<>();
        String[] rawSupervisors = this.supervisorName.split("/");

        for (String raw : rawSupervisors) {
            String cleaned = raw.trim();
            if (cleaned.isEmpty()) continue;

            String[] parts = cleaned.split("\\s+");
            String surname = parts[parts.length - 1].trim();

            if (!surname.isEmpty()) {
                surnames.add(surname);
            }
        }

        return surnames;
    }

    /**
     * Strict mode:
     * - supervisorName vide => refuse
     * - un surname introuvable => refuse
     * - un surname ambigu (>1 résultats) => refuse
     */
    private List<Researcher> resolveSupervisorsStrictOrFail() {
        List<String> surnames = extractSupervisorSurnames();

        if (surnames.isEmpty()) {
            System.err.println("[CsvPostDoc] SKIP idCsvPostDoc=" + this.idCsvPostDoc
                    + " : supervisorName is empty/blank.");
            return null;
        }

        List<Researcher> result = new ArrayList<>();

        for (String surname : surnames) {
            List<Researcher> found = researcherRepository.findByResearcherSurname(surname);

            if (found == null || found.isEmpty()) {
                System.err.println("[CsvPostDoc] SKIP idCsvPostDoc=" + this.idCsvPostDoc
                        + " : supervisor surname '" + surname + "' not found in DB (supervisorName='"
                        + this.supervisorName + "').");
                return null;
            }

            if (found.size() > 1) {
                System.err.println("[CsvPostDoc] SKIP idCsvPostDoc=" + this.idCsvPostDoc
                        + " : supervisor surname '" + surname + "' matches " + found.size()
                        + " researchers -> ambiguous (supervisorName='" + this.supervisorName + "').");
                return null;
            }

            Researcher unique = found.get(0);

            // Contrôle "nom vide" (le cas que tu as)
            String surnameDb = unique.getResearcherSurname();
            if (surnameDb == null || surnameDb.trim().isEmpty()) {
                System.err.println("[CsvPostDoc] SKIP idCsvPostDoc=" + this.idCsvPostDoc
                        + " : matched researcher has empty surname in DB (id="
                        + unique.getResearcherId()+ ").");
                return null;
            }

            result.add(unique);
        }

        return result;
    }

    // ===========================
    //   Clés de merge
    // ===========================
    @Override
    public String getMergingKey() {
        return "postdoc_csv_" + this.getIdCsvPostDoc();
    }

    @Override
    public String getMergingKey(Activity entity) {
        if (entity == null || entity.getIdActivity() == null) {
            return "";
        }
        return "postdoc_db_" + entity.getIdActivity();
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
        return this.getIdCsvPostDoc();
    }

    // ===========================
    //   Getters / Setters
    // ===========================
    public Integer getIdCsvPostDoc() {
        return idCsvPostDoc;
    }

    public void setIdCsvPostDoc(Integer idCsvPostDoc) {
        this.idCsvPostDoc = idCsvPostDoc;
    }

    public String getPostdocOrSeniorName() {
        return postdocOrSeniorName;
    }

    public void setPostdocOrSeniorName(String postdocOrSeniorName) {
        this.postdocOrSeniorName = postdocOrSeniorName;
    }

    public java.sql.Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(java.sql.Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public java.sql.Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(java.sql.Date departureDate) {
        this.departureDate = departureDate;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getSupervisorName() {
        return supervisorName;
    }

    public void setSupervisorName(String supervisorName) {
        this.supervisorName = supervisorName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getOriginalLab() {
        return originalLab;
    }

    public void setOriginalLab(String originalLab) {
        this.originalLab = originalLab;
    }

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public String getAssociatedPublicationRef() {
        return associatedPublicationRef;
    }

    public void setAssociatedPublicationRef(String associatedPublicationRef) {
        this.associatedPublicationRef = associatedPublicationRef;
    }

    public String getPublicationSimplifiedReference() {
        return publicationSimplifiedReference;
    }

    public void setPublicationSimplifiedReference(String publicationSimplifiedReference) {
        this.publicationSimplifiedReference = publicationSimplifiedReference;
    }
}
