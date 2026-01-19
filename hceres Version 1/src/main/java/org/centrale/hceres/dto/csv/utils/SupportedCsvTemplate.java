package org.centrale.hceres.dto.csv.utils;

import java.util.*;
import java.util.function.BiConsumer;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * SupportedCsvTemplate - Java translation of the frontend SupportedCsvTemplate
 *
 * Each CSV template is registered here with:
 * - key
 * - label
 * - list of fileName regex patterns
 * - list of fields (headers)
 * - merging rules (strings)
 * - dependencies (other templates referenced by key; resolved after all templates are registered)
 *
 * Usage examples:
 *   SupportedCsvTemplate.getByKey("RESEARCHER")
 *   SupportedCsvTemplate.matchByFileName("researcher_2024.csv")
 *   SupportedCsvTemplate.getAllTemplates()
 */
public enum SupportedCsvTemplate {
    RESEARCHER(
            "Liste des chercheurs",
            List.of(Pattern.compile("^researcher.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("Researcher_id", "Researcher_Surname", "Researcher_Name", "Researcher_Email"),
            List.of("Merge based on equal ignoring case Surname, Name and Email"),
            List.of()
    ),

    INSTITUTION(
            "Liste des institutions",
            List.of(Pattern.compile("^institution.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("institution_id", "institution_name"),
            List.of("Merge based on equal ignoring case institution name"),
            List.of()
    ),

    LABORATORY(
            "Liste des laboratoires",
            List.of(Pattern.compile("^laboratory.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("laboratory_id", "laboratory_name", "laboratory_acronym", "institution_id"),
            List.of("Merge based on equal ignoring case laboratory_name, laboratory_acronym and institution_id"),
            List.of("INSTITUTION")
    ),

    TEAM(
            "Liste des équipes",
            List.of(Pattern.compile("^team.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("team_id", "team_name", "laboratory_id"),
            List.of("Merge based on equal ignoring case team name"),
            List.of("LABORATORY")
    ),

    BELONG_TEAM(
            "Associations des chercheurs aux équipes",
            List.of(Pattern.compile("^belongs_team.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("Researcher_ID", "Team_ID"),
            List.of("Merge based using reference of dependencies Researcher and Team"),
            List.of("RESEARCHER", "TEAM")
    ),

    NATIONALITY(
            "Liste des nationalités",
            List.of(Pattern.compile("^nationality.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("nationality_id", "nationality_name"),
            List.of("Merge based on nationality_name"),
            List.of()
    ),

    TYPE_ACTIVITY(
            "Liste des types des activités",
            List.of(Pattern.compile("^type_activity.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_type", "name_type"),
            List.of("Merge based on id of activity type fixed by Application"),
            List.of()
    ),

    ACTIVITY(
            "Liste des activités",
            List.of(Pattern.compile("^activity.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_type", "id_activity", "id_researcher", "specific_activity_count", "activity_name_type"),
            List.of(
                    "Merge based on id_researcher present in dependency researcher.",
                    "Merge based on id_type present in dependency type_activity.",
                    "Child dependency details of activites must be present in separate file activityTemplate.csv matching id_type and specific_activity_count. Otherwise Entry is ignored"
            ),
            List.of("RESEARCHER", "TYPE_ACTIVITY")
    ),

    SR_AWARD(
            "Liste des sr_awards",
            List.of(Pattern.compile("^sr_award.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "award_date", "awardee_name", "description"),
            List.of("Merge based on award_date, awardee_name and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    BOOK(
            "Liste des livres",
            List.of(Pattern.compile("^book.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "publication_date", "title", "editor", "authors", "language"),
            List.of("Merge based on publication_date, title, editor, authors, language and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    SR_RESPONSIBILITY_LEARNED_SCIENTIFIC_SOCIETY(
            "Liste des responsabilités dans les sociétés savantes",
            List.of(Pattern.compile("^sr_responsibility_learned_scientific_society.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "start_date", "end_date", "scientific_society_name"),
            List.of("Merge based on start_date, end_date, scientific_society_name and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    FUNCTION_EDITORIAL_ACTIVITY(
            "Liste des fonctions des activités éditoriales",
            List.of(Pattern.compile("^function_editorial_activity.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_function", "name_function"),
            List.of("Merge based on name of the function"),
            List.of()
    ),

    EDITORIAL_ACTIVITY(
            "Liste des activités éditoriales",
            List.of(Pattern.compile("^editorial_activity.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "start_date", "end_date", "name_journal", "impact_factor_journal", "id_function"),
            List.of(
                    "Merge based on start_date, end_date, name_journal, impact_factor_journal, id_function and the researcher getting it",
                    "Id function => function_editorial_activity is already present in database inserted via SQL."
            ),
            List.of("ACTIVITY")
    ),

    EDUCATIONAL_OUTPUT(
            "Liste des productions éducatives",
            List.of(Pattern.compile("^educational_output.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "completion_date", "id_type", "description"),
            List.of(
                    "Merge based on completion_date, id_type, description and the researcher getting it",
                    "Id type => type_educational_output is already present in database inserted via SQL."
            ),
            List.of("ACTIVITY")
    ),

    INVITED_ORAL_COMMUNICATION(
            "Liste des communications invitées orales",
            List.of(Pattern.compile("^invited_oral_communication.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "date_communication", "title", "name_meeting", "date_meeting", "location"),
            List.of("Merge based on date_communication, title, name_meeting, date_meeting, location and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    INVITED_SEMINAR(
            "Liste des séminaires invités",
            List.of(Pattern.compile("^invited_seminar.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "date", "title_seminar", "location", "invited_by"),
            List.of("Merge based on date, title_seminar, location, invited_by and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    INVOLVEMENT_TRAINING_PEDAGOGICAL_RESPONSIBILITY(
            "Liste des responsabilités pédagogiques",
            List.of(Pattern.compile("^involvement_training_pedagogical_responsibility.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "year", "name_master", "type_involvement_in_training"),
            List.of("Merge based on year, name_master and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    LANGUAGE(
            "Liste des langues",
            List.of(Pattern.compile("^language.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("language_id", "language_name"),
            List.of("Merge based on language_name"),
            List.of()
    ),

    MEETING_CONGRESS_ORG(
            "Liste des réunions et congrès organisés",
            List.of(Pattern.compile("^meeting_congress_org.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "year", "id_type", "name_congress", "date", "location"),
            List.of("Merge based on year, id_type, name_congress, date, location and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    NATIONAL_INTERNATIONAL_COLLABORATION(
            "Liste des collaborations nationales et internationales",
            List.of(Pattern.compile("^national_international_collaboration.*csv", Pattern.CASE_INSENSITIVE)),
            List.of(
                    "id_activity",
                    "date_project_start",
                    "id_type",
                    "partner_entity",
                    "country_state_city",
                    "pi_partners",
                    "mail_partners",
                    "active_project",
                    "ref_joint_publication",
                    "umr1064_coordinated",
                    "agreement_signed",
                    "number_resulting_publications",
                    "associated_funding"
            ),
            List.of("Merge based on date_project_start, id_type, partner_entity, country_state_city, pi_partners, mail_partners, active_project, ref_joint_publication, umr1064_coordinated, agreement_signed, number_resulting_publications, associated_funding and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    ORAL_COMMUNICATION_POSTER(
            "Liste des communications orales et posters",
            List.of(Pattern.compile("^oral_communication_poster.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "year", "id_type_com", "id_choice_meeting", "titleoral_com_poster", "authors", "meeting_name", "date", "location"),
            List.of("Merge based on year, id_type_com, id_choice_meeting, titleoral_com_poster, authors, meeting_name, date, location and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    PHD_TYPE(
            "Liste des types de thèses",
            List.of(Pattern.compile("^phd_type.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("phd_type_id", "phd_type_name"),
            List.of("Merge based on phd_type_name"),
            List.of()
    ),

    PLATFORM(
            "Liste des plateformes",
            List.of(Pattern.compile("^platform.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "creation_date", "description", "managers", "affiliation", "labellisation", "open_private_researchers"),
            List.of("Merge based on creation_date, description, managers, affiliation, labellisation, open_private_researchers and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    PUBLIC_OUTREACH_TYPE(
            "Liste des types d'actions de sensibilisation",
            List.of(Pattern.compile("^public_outreach_type.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("public_outreach_type_id", "public_outreach_type_name"),
            List.of("Merge based on public_outreach_type_name"),
            List.of()
    ),

    PUBLIC_OUTREACH(
            "Liste des actions de sensibilisation",
            List.of(Pattern.compile("^public_outreach.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "description", "id_type"),
            List.of("Merge based on description, id_type and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    PUBLICATION_TYPE(
            "Liste des types de publications",
            List.of(Pattern.compile("^publication_type.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("publication_type_id", "publication_type_name"),
            List.of("Merge based on publication_type_name"),
            List.of()
    ),

    PUBLICATION(
            "Liste des publications",
            List.of(Pattern.compile("^publication.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "title", "authors", "source", "publication_date", "pmid", "impact_factor", "clinic", "pdc", "colab_inter", "colab_intra_crti", "id_choice"),
            List.of("Merge based on title, authors, source, publication_date, pmid, impact_factor, clinic, pdc, colab_inter, colab_intra_crti, id_choice and the researcher getting it"),
            List.of("ACTIVITY", "PUBLICATION_TYPE")
    ),

    TYPE_RESEARCH_CONTRACT(
            "Liste des types de contrats de recherche",
            List.of(Pattern.compile("^type_research_contract.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_type", "name_type"),
            List.of("Merge based on name_type"),
            List.of()
    ),

    RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST(
            "Liste des contrats de recherche financés par des institutions publiques ou caritatives",
            List.of(Pattern.compile("^research_contract_funded_public_charitable_inst.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "date_contract_award", "funding_institution", "project_title", "start_year", "end_year", "grant_amount", "id_type"),
            List.of("Merge based on date_contract_award, funding_institution, project_title, start_year, end_year, grant_amount, id_type and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    LABORATORY_EVALUATION_ROLE(
            "Liste des rôles dans les évaluations de laboratoire",
            List.of(Pattern.compile("^laboratory_evaluation_role.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("laboratory_evaluation_role_id", "name_choice"),
            List.of("Merge based on name_choice"),
            List.of()
    ),

    RESPONSIBILITY_INSTITUTIONAL_COMITEE_JURY(
            "Liste des responsabilités dans les comités d'institution",
            List.of(Pattern.compile("^responsibility_institutional_comitee_jury.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "year", "name_institutional_comitee", "id_role_pi_lab_eval"),
            List.of("Merge based on year, name_institutional_comitee, id_role_pi_lab_eval and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    SCIENTIFIC_EXPERTISE_TYPE(
            "Liste des types d'expertises scientifiques",
            List.of(Pattern.compile("^scientific_expertise_type.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("scientific_expertise_type_id", "name_choice"),
            List.of("Merge based on name_choice"),
            List.of()
    ),

    REVIEWING_JOURNAL_ARTICLES(
            "Liste des revues de journaux",
            List.of(Pattern.compile("^reviewing_journal_articles.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "year", "name_journal", "nb_reviewed_articles", "impact_factor_journal"),
            List.of("Merge based on year, name_journal, nb_reviewed_articles, impact_factor_journal and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    SCIENTIFIC_EXPERTISE(
            "Liste des expertises scientifiques",
            List.of(Pattern.compile("^scientific_expertise.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "start_date", "id_type", "description", "end_date"),
            List.of("Merge based on start_date, id_type, description and the researcher getting it", "Id type => scientific_expertise_type is already present in database inserted via SQL."),
            List.of("ACTIVITY")
    ),

    SEI_CLINICAL_TRIAL(
            "Liste des essais cliniques",
            List.of(Pattern.compile("^sei_clinical_trial.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "start_date", "coordinator_partner", "title_clinical_trial", "end_date", "registration_nb", "sponsor_name", "included_patients_nb", "funding", "funding_amount"),
            List.of("Merge based on start_date, coordinator_partner, title_clinical_trial, end_date, registration_nb, sponsor_name, included_patients_nb, funding, funding_amount and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    SEI_INDUSTRIAL_R_D_CONTRACT(
            "Liste des contrats de recherche industrielle",
            List.of(Pattern.compile("^sei_industrial_r_d_contract.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "start_date", "name_company_involved", "project_title", "agreement_amount", "end_date"),
            List.of("Merge based on start_date, name_company_involved, project_title, agreement_amount, end_date and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    STATUS(
            "Liste des statuts",
            List.of(Pattern.compile("^status.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_status", "name_status"),
            List.of("Merge based on name_status"),
            List.of()
    ),

    TOOL_PRODUCT_COHORT(
            "Liste des cohortes",
            List.of(Pattern.compile("^tool_product_cohort.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "name_cohort", "creation_date", "involved_researchers_crti", "description"),
            List.of("Merge based on name_cohort, creation_date, involved_researchers_crti, description and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    TOOL_PRODUCT_DATABASE(
            "Liste des bases de données",
            List.of(Pattern.compile("^tool_product_database.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "title_database", "creation_date", "authors", "description"),
            List.of("Merge based on title_database, creation_date, authors, description and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    TOOL_PRODUCT_DECISION_SUPPORT_TOOL(
            "Liste des outils de décision",
            List.of(Pattern.compile("^tool_product_decision_support_tool.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "name_decision_support_tool", "creation_date", "authors", "description"),
            List.of("Merge based on name_decision_support_tool, creation_date, authors, description and the researcher getting it"),
            List.of("ACTIVITY")
    ),

    TOOL_PRODUCT_SOFTWARE(
            "Liste des logiciels",
            List.of(Pattern.compile("^tool_product_software.*csv", Pattern.CASE_INSENSITIVE)),
            List.of("id_activity", "name_software", "creation_date", "authors", "description"),
            List.of("Merge based on name_software, creation_date, authors, description and the researcher getting it"),
            List.of("ACTIVITY")
    ),
    POSTDOC_ACTIVITY(
        "Liste des postdocs et chercheurs seniors",
        List.of(
                Pattern.compile("^postdoc.*csv", Pattern.CASE_INSENSITIVE)
        ),
        List.of(
                "id_activity",
                "postdoc_or_senior_name",
                "arrival_date",
                "departure_date",
                "supervisor_name",
                "original_lab",
                "associated_funding",
                "publication_simplified_reference"
        ),
        List.of(
                "Merge based on postdoc_or_senior_name, arrival_date, departure_date, supervisor_name, original_lab, associated_funding, publication_simplified_reference and the researcher getting it"
        ),
        List.of("ACTIVITY")
),

    
    TRAINING_THESIS(
        "Liste des thèses de doctorat",
        List.of(Pattern.compile("^training_thesis.*csv", Pattern.CASE_INSENSITIVE)),
        List.of(
                "id_activity",
                "name_student",
                "surname_student",
                "nationality",
                "id_background",
                "start_date",
                "defense_date",
                "duration_thesis",
                "name_director",
                "associated_funding",
                "nb_original_articles",
                "nb_original_articles_1_2_position",
                "ref_publications",
                "becoming_student"
        ),
        List.of(
                "Merge based on researcher, student name, thesis start_date and name_director"
        ),
        List.of("ACTIVITY")
);

    // --- enum fields ---
    private final String label;
    private final List<Pattern> fileNamePatterns;
    private final List<String> fields;
    private final List<String> mergingRules;
    private final List<String> dependencyKeys;

    SupportedCsvTemplate(String label,
                         List<Pattern> fileNamePatterns,
                         List<String> fields,
                         List<String> mergingRules,
                         List<String> dependencyKeys) {
        this.label = label;
        this.fileNamePatterns = Collections.unmodifiableList(new ArrayList<>(fileNamePatterns));
        this.fields = Collections.unmodifiableList(new ArrayList<>(fields));
        this.mergingRules = Collections.unmodifiableList(new ArrayList<>(mergingRules));
        this.dependencyKeys = dependencyKeys == null ? Collections.emptyList() : Collections.unmodifiableList(new ArrayList<>(dependencyKeys));
    }

    // --- getters ---
    public String getKey() {
        return this.name();
    }

    public String getLabel() {
        return label;
    }

    public List<Pattern> getFileNamePatterns() {
        return fileNamePatterns;
    }

    public List<String> getFields() {
        return fields;
    }

    public List<String> getMergingRules() {
        return mergingRules;
    }

    /**
     * Resolve dependency keys to enum constants.
     * If a key does not exist, it is ignored.
     */
    public List<SupportedCsvTemplate> getDependencies() {
        if (dependencyKeys.isEmpty()) return Collections.emptyList();
        List<SupportedCsvTemplate> deps = new ArrayList<>();
        for (String k : dependencyKeys) {
            try {
                SupportedCsvTemplate t = SupportedCsvTemplate.valueOf(k);
                deps.add(t);
            } catch (IllegalArgumentException ex) {
                // unknown dependency key: ignore (or log if you prefer)
            }
        }
        return Collections.unmodifiableList(deps);
    }

    /**
     * Collect recursive dependencies (depth-first, no duplicates).
     */
    public List<SupportedCsvTemplate> collectDependenciesRecursive() {
        LinkedHashSet<SupportedCsvTemplate> set = new LinkedHashSet<>();
        collectHelper(this, set);
        return new ArrayList<>(set);
    }

    private static void collectHelper(SupportedCsvTemplate current, LinkedHashSet<SupportedCsvTemplate> set) {
        for (SupportedCsvTemplate d : current.getDependencies()) {
            if (!set.contains(d)) {
                set.add(d);
                collectHelper(d, set);
            }
        }
    }

    /**
     * Try to find a template matching the provided filename (first match).
     */
    public static Optional<SupportedCsvTemplate> matchByFileName(String fileName) {
        if (fileName == null) return Optional.empty();
        for (SupportedCsvTemplate t : values()) {
            for (Pattern p : t.getFileNamePatterns()) {
                if (p.matcher(fileName).find()) {
                    return Optional.of(t);
                }
            }
        }
        return Optional.empty();
    }

    /**
     * Convenience: get by key/name case-sensitive (returns Optional).
     */
    public static Optional<SupportedCsvTemplate> getByKey(String key) {
        if (key == null) return Optional.empty();
        try {
            return Optional.of(SupportedCsvTemplate.valueOf(key));
        } catch (IllegalArgumentException ex) {
            return Optional.empty();
        }
    }

    /**
     * All registered template keys.
     */
    public static Set<String> getAllKeys() {
        return Arrays.stream(values()).map(Enum::name).collect(Collectors.toCollection(LinkedHashSet::new));
    }
}
