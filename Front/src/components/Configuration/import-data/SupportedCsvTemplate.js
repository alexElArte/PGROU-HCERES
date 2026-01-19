class SupportedCsvTemplate {
    // affected table: researcher
    RESEARCHER = {
        key: "RESEARCHER",
        label: "Liste des chercheurs",
        fileNamePattern: [
            /^researcher.*csv/,
        ],
        fields: [
            "Researcher_id",
            "Researcher_Surname",
            "Researcher_Name",
            "Researcher_Email",
        ],
        mergingRules: ["Merge based on equal ignoring case Surname, Name and Email",
        ],
        dependencies: [],
    };

    // affected table: institution
    INSTITUTION = {
        key: "INSTITUTION",
        label: "Liste des institutions",
        fileNamePattern: [
            /^institution.*csv/,
        ],
        fields: [
            "institution_id",
            "institution_name",
        ],
        mergingRules: ["Merge based on equal ignoring case institution name",
        ],
        dependencies: [],
    };

    LABORATORY = {
        key: "LABORATORY",
        label: "Liste des laboratoires",
        fileNamePattern: [
            /^laboratory.*csv/,
        ],
        fields: [
            "laboratory_id",
            "laboratory_name",
            "laboratory_acronym",
            "institution_id"
        ],
        mergingRules: ["Merge based on equal ignoring case laboratory_name, laboratory_acronym and institution_id",
        ],
        dependencies: [this.INSTITUTION],
    };

    TEAM = {
        key: "TEAM",
        label: "Liste des équipes",
        fileNamePattern: [
            /^team.*csv/,
        ],
        fields: [
            "team_id",
            "team_name",
            "laboratory_id"
        ],
        mergingRules: ["Merge based on equal ignoring case team name",
        ],
        dependencies: [],
    };

    BELONG_TEAM = {
    key: "BELONG_TEAM",
    label: "Associations des chercheurs aux équipes",
    fileNamePattern: [
        /^belongs_team.*\.csv$/i,
    ],
    fields: [
        "Belongs_Team_ID",
        "Researcher_ID",
        "Team_ID"
    ],
    mergingRules: [
        "Merge based on Belongs_Team_ID (technical CSV identifier)",
        "Integrity ensured by Researcher_ID and Team_ID dependencies"
    ],
    dependencies: [
        this.RESEARCHER,
        this.TEAM
    ],
};


    NATIONALITY = {
        key: "NATIONALITY",
        label: "Liste des nationalités",
        fileNamePattern: [
            /^nationality.*csv/,
        ],
        fields: [
            "nationality_id",
            "nationality_name"
        ],
        mergingRules: ["Merge based on nationality_name",
        ],
        dependencies: [],
    };

    // Groupes of activities
    TYPE_ACTIVITY = {
        key: "TYPE_ACTIVITY",
        label: "Liste des types des activités",
        fileNamePattern: [
            /^type_activity.*csv/,
        ],
        fields: [
            "id_type",
            "name_type"
        ],
        mergingRules: ["Merge based on id of activity type fixed by Application",
        ],
        dependencies: [],
    };
    ACTIVITY = {
        key: "ACTIVITY",
        label: "Liste des activités",
        fileNamePattern: [
            /^activity.*csv/,
        ],
        fields: [
            "id_type",
            "id_activity",
            "id_researcher",
            "specific_activity_count",
            "activity_name_type"
        ],
        mergingRules: ["Merge based on id_researcher present in dependency researcher.",
            "Merge based on id_type present in dependency type_activity.",
            "Child dependency details of activites must be present in separate file activityTemplate.csv matching id_type and specific_activity_count. Otherwise Entry is ignored",
        ],
        dependencies: [this.RESEARCHER, this.TYPE_ACTIVITY],
    };

    SR_AWARD = {
  key: "SR_AWARD",
  label: "Liste des sr_awards",
  fileNamePattern: [
    /^sr_award.*csv/,
  ],
  fields: [
    "id_activity",
    "Year of award / year of completion",
    "Name of researcher",
    "Name of awardee",
    "Titre EN",
  ],
  mergingRules: [
    "Merge based on award year/date, title (Titre EN), awardee_name and the researcher(s) getting it",
  ],
  dependencies: [], // plus de dépendance ACTIVITY, comme TrainingThesis
};


    BOOK = {
        key: "BOOK",
        label: "Liste des livres",
        fileNamePattern: [
            /^book.*csv/,
        ],
        fields: [
            "id_activity",
            "publication_date",
            "title",
            "editor",
            "authors",
            "language"
        ],
        mergingRules: ["Merge based on publication_date, title, editor, authors, language and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    SR_RESPONSIBILITY_LEARNED_SCIENTIFIC_SOCIETY = {
        key: "SR_RESPONSIBILITY_LEARNED_SCIENTIFIC_SOCIETY",
        label: "Liste des responsabilités dans les sociétés savantes",
        fileNamePattern: [
            /^sr_responsibility_learned_scientific_society.*csv/,
        ],
        fields: [
            "id_activity",
            "start_date",
            "end_date",
            "scientific_society_name"
        ],
        mergingRules: ["Merge based on start_date, end_date, scientific_society_name and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    FUNCTION_EDITORIAL_ACTIVITY = {
        key: "FUNCTION_EDITORIAL_ACTIVITY",
        label: "Liste des fonctions des activités éditoriales",
        fileNamePattern: [
            /^function_editorial_activity.*csv/,
        ],
        fields: [
            "id_function",
            "name_function"
        ],
        mergingRules: ["Merge based on name of the function",
        ],
        dependencies: [],
    }
    EDITORIAL_ACTIVITY = {
        key: "EDITORIAL_ACTIVITY",
        label: "Liste des activités éditoriales",
        fileNamePattern: [
            /^editorial_activity.*csv/,
        ],
        fields: [
            "id_activity",
            "start_date",
            "end_date",
            "name_journal",
            "impact_factor_journal",
            "id_function"
        ],
        mergingRules: ["Merge based on start_date, end_date, name_journal, impact_factor_journal, id_function and the researcher getting it",
            "Id function => function_editorial_activity is already present in database inserted via SQL."
        ],
        dependencies: [this.ACTIVITY],
    }

    // educational_output.csv
    // id_activity;completion_date;id_type;description
    EDUCATIONAL_OUTPUT = {
        key: "EDUCATIONAL_OUTPUT",
        label: "Liste des productions éducatives",
        fileNamePattern: [
            /^educational_output.*csv/,
        ],
        fields: [
            "id_activity",
            "completion_date",
            "id_type",
            "description"
        ],
        mergingRules: ["Merge based on completion_date, id_type, description and the researcher getting it",
            "Id type => type_educational_output is already present in database inserted via SQL."
        ],
        dependencies: [this.ACTIVITY],
    }
    INVITED_ORAL_COMMUNICATION = {
        key: "INVITED_ORAL_COMMUNICATION",
        label: "Liste des communications invitées orales",
        fileNamePattern: [
            /^invited_oral_communication.*csv/,
        ],
        fields: [
            "id_activity",
            "date_communication",
            "title",
            "name_meeting",
            "date_meeting",
            "location"
        ],
        mergingRules: ["Merge based on date_communication, title, name_meeting, date_meeting, location and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    INVITED_SEMINAR = {
        key: "INVITED_SEMINAR",
        label: "Liste des séminaires invités",
        fileNamePattern: [
            /^invited_seminar.*csv/,
        ],
        fields: [
            "id_activity",
            "date",
            "title_seminar",
            "location",
            "invited_by"
        ],
        mergingRules: ["Merge based on date, title_seminar, location, invited_by and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    INVOLVEMENT_TRAINING_PEDAGOGICAL_RESPONSIBILITY = {
        key: "INVOLVEMENT_TRAINING_PEDAGOGICAL_RESPONSIBILITY",
        label: "Liste des responsabilités pédagogiques",
        fileNamePattern: [
            /^involvement_training_pedagogical_responsibility.*csv/,
        ],
        fields: [
            "id_activity",
            "year",
            "name_master",
            "type_involvement_in_training",
        ],
        mergingRules: ["Merge based on year, name_master and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    LANGUAGE = {
        key: "LANGUAGE",
        label: "Liste des langues",
        fileNamePattern: [
            /^language.*csv/,
        ],
        fields: [
            "language_id",
            "language_name"
        ],
        mergingRules: ["Merge based on language_name",
        ],
        dependencies: [],
    }

    MEETING_CONGRESS_ORG = {
        key: "MEETING_CONGRESS_ORG",
        label: "Liste des réunions et congrès organisés",
        fileNamePattern: [
            /^meeting_congress_org.*csv/,
        ],
        fields: [
            "id_activity",
            "year",
            "id_type",
            "name_congress",
            "date",
            "location"
        ],
        mergingRules: ["Merge based on year, id_type, name_congress, date, location and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    NATIONAL_INTERNATIONAL_COLLABORATION = {
        key: "NATIONAL_INTERNATIONAL_COLLABORATION",
        label: "Liste des collaborations nationales et internationales",
        fileNamePattern: [
            /^national_international_collaboration.*csv/,
        ],
        fields: [
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
        ],
        mergingRules: ["Merge based on date_project_start, id_type, partner_entity, country_state_city, pi_partners, mail_partners, active_project, ref_joint_publication, umr1064_coordinated, agreement_signed, number_resulting_publications, associated_funding and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    ORAL_COMMUNICATION_POSTER = {
        key: "ORAL_COMMUNICATION_POSTER",
        label: "Liste des communications orales et posters",
        fileNamePattern: [
            /^oral_communication_poster.*csv/,
        ],
        fields: [
            "id_activity",
            "year",
            "id_type_com",
            "id_choice_meeting",
            "titleoral_com_poster",
            "authors",
            "meeting_name",
            "date",
            "location"
        ],
        mergingRules: ["Merge based on year, id_type_com, id_choice_meeting, titleoral_com_poster, authors, meeting_name, date, location and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }
    POSTDOC = {
    key: "POSTDOC",
    label: "Liste des postdocs et chercheurs seniors",
    fileNamePattern: [
        /^postdoc_senior_4.*csv/,
    ],
    // ⚠️ Même nombre de colonnes et même ordre que le CSV
    fields: [
        "id_activity",                        // id_activity
        "postdoc_or_senior_name",            // Name of the post-doc/ senior scientist
        "arrival_date_en",                   // Arrival date (EN)
        "departure_date",                    // Departure date
        "duration",                          // Duration
        "supervisor_name",                   // Name of the supervisor
        "type_scrolling_list",               // "type (scrolling list)"
        "nationality",                       // nationality
        "original_lab",                      // original lab
        "associated_funding",                // associated funding
        "ref_associated_publications",       // reference of the associated publication(s)
        "publication_simplified_reference",  // ref simplifiée
    ],
    mergingRules: [
        "Merge based on postdoc_or_senior_name, arrival_date_en, departure_date, supervisor_name, original_lab, associated_funding, publication_simplified_reference and the researcher getting it",
    ],
    dependencies: [this.ACTIVITY],
}



    THESIS_TYPE = {
        key: "THESIS_TYPE",
        label: "Liste des types de thèses",
        fileNamePattern: [
            /^phd_type.*csv/,
        ],
        fields: [
            "phd_type_id",
            "phd_type_name"
        ],
        mergingRules: ["Merge based on phd_type_name",
        ],
        dependencies: [],
    }

    PLATFORM = {
        key: "PLATFORM",
        label: "Liste des plateformes",
        fileNamePattern: [
            /^platform.*csv/,
        ],
        fields: [
            "id_activity",
            "creation_date",
            "description",
            "managers",
            "affiliation",
            "labellisation",
            "open_private_researchers"
        ],
        mergingRules: ["Merge based on creation_date, description, managers, affiliation, labellisation, open_private_researchers and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }


    PUBLIC_OUTREACH_TYPE = {
        key: "PUBLIC_OUTREACH_TYPE",
        label: "Liste des types d'actions de sensibilisation",
        fileNamePattern: [
            /^public_outreach_type.*csv/,
        ],
        fields: [
            "public_outreach_type_id",
            "public_outreach_type_name"
        ],
        mergingRules: ["Merge based on public_outreach_type_name",
        ],
        dependencies: [],
    }

    PUBLIC_OUTREACH = {
        key: "PUBLIC_OUTREACH",
        label: "Liste des actions de sensibilisation",
        fileNamePattern: [
            /^public_outreach.*csv/,
        ],
        fields: [
            "id_activity",
            "description",
            "id_type"
        ],
        mergingRules: ["Merge based on description, id_type and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    // publication_type
    // "publication_type_id";"publication_type_name"

    PUBLICATION_TYPE = {
        key: "PUBLICATION_TYPE",
        label: "Liste des types de publications",
        fileNamePattern: [
            /^publication_type.*csv/,
        ],
        fields: [
            "publication_type_id",
            "publication_type_name"
        ],
        mergingRules: ["Merge based on publication_type_name",
        ],
        dependencies: [],
    }

    PUBLICATION = {
        key: "PUBLICATION",
        label: "Liste des publications",
        fileNamePattern: [
            /^publication.*csv/,
        ],
        fields: [
            "id_activity",
            "title",
            "authors",
            "source",
            "publication_date",
            "pmid",
            "impact_factor",
            "clinic",
            "pdc",
            "colab_inter",
            "colab_intra_crti",
            "id_choice"
        ],
        mergingRules: ["Merge based on title, authors, source, publication_date, pmid, impact_factor, clinic, pdc, colab_inter, colab_intra_crti, id_choice and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY, this.PUBLICATION_TYPE],
    }

    TYPE_RESEARCH_CONTRACT = {
        key: "TYPE_RESEARCH_CONTRACT",
        label: "Liste des types de contrats de recherche",
        fileNamePattern: [
            /^type_research_contract.*csv/,
        ],
        fields: [
            "id_type",
            "name_type"
        ],
        mergingRules: ["Merge based on name_type",
        ],
        dependencies: [],
    }
    RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST = {
    key: "RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST",
    label: "Liste des contrats de recherche financés par des institutions publiques ou caritatives",
    fileNamePattern: [
        /^research_contract_funded_public_2.*csv/,
    ],
    fields: [
        "id_activity",                
        "year_contract_award",        
        "type_scrolling_list",        
        "type_nomenclature_2019",     
        "funding_institution",        
        "researcher_name",           
        "project_title",              
        "start_end_years",            
        "funding_duration_months",    
        "grant_amount"                
    ],
    mergingRules: [
        "Merge based on year_contract_award, funding_institution, project_title, start_end_years, grant_amount, type_scrolling_list and the researcher_name"
    ],
    dependencies: [this.ACTIVITY],
}


    // laboratory_evaluation_role
    // "laboratory_evaluation_role_id";"name_choice"
    LABORATORY_EVALUATION_ROLE = {
        key: "LABORATORY_EVALUATION_ROLE",
        label: "Liste des rôles dans les évaluations de laboratoire",
        fileNamePattern: [
            /^laboratory_evaluation_role.*csv/,
        ],
        fields: [
            "laboratory_evaluation_role_id",
            "name_choice"
        ],
        mergingRules: ["Merge based on name_choice",
        ],
        dependencies: [],
    }

    // referenced element in database: institutional_comitee
    RESPONSIBILITY_INSTITUTIONAL_COMITEE_JURY = {
        key: "RESPONSIBILITY_INSTITUTIONAL_COMITEE_JURY",
        label: "Liste des responsabilités dans les comités d'institution",
        fileNamePattern: [
            /^responsibility_institutional_comitee_jury.*csv/,
        ],
        fields: [
            "id_activity",
            "year",
            "name_institutional_comitee",
            "id_role_pi_lab_eval"
        ],
        mergingRules: ["Merge based on year, name_institutional_comitee, id_role_pi_lab_eval and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    // scientific_expertise_type
    // "scientific_expertise_type_id";"name_choice"
    SCIENTIFIC_EXPERTISE_TYPE = {
        key: "SCIENTIFIC_EXPERTISE_TYPE",
        label: "Liste des types d'expertises scientifiques",
        fileNamePattern: [
            /^scientific_expertise_type.*csv/,
        ],
        fields: [
            "scientific_expertise_type_id",
            "name_choice"
        ],
        mergingRules: ["Merge based on name_choice",
        ],
        dependencies: [],
    }

    REVIEWING_JOURNAL_ARTICLES = {
        key: "REVIEWING_JOURNAL_ARTICLES",
        label: "Liste des revues de journaux",
        fileNamePattern: [
            /^reviewing_journal_articles.*csv/,
        ],
        fields: [
            "id_activity",
            "year",
            "name_journal",
            "nb_reviewed_articles",
            "impact_factor_journal"
        ],
        mergingRules: ["Merge based on year, name_journal, nb_reviewed_articles, impact_factor_journal and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }
    SCIENTIFIC_EXPERTISE = {
        key: "SCIENTIFIC_EXPERTISE",
        label: "Liste des expertises scientifiques",
        fileNamePattern: [
            /^scientific_expertise.*csv/,
        ],
        fields: [
            "id_activity",
            "start_date",
            "id_type",
            "description",
            "end_date"
        ],
        mergingRules: ["Merge based on start_date, id_type, description and the researcher getting it",
            "Id type => scientific_expertise_type is already present in database inserted via SQL."
        ],
        dependencies: [this.ACTIVITY],
    }

    SEI_CLINICAL_TRIAL = {
        key: "SEI_CLINICAL_TRIAL",
        label: "Liste des essais cliniques",
        fileNamePattern: [
            /^sei_clinical_trial.*csv/,
        ],
        fields: [
            "id_activity",
            "start_date",
            "coordinator_partner",
            "title_clinical_trial",
            "end_date",
            "registration_nb",
            "sponsor_name",
            "included_patients_nb",
            "funding",
            "funding_amount"
        ],
        mergingRules: ["Merge based on start_date, coordinator_partner, title_clinical_trial, end_date, registration_nb, sponsor_name, included_patients_nb, funding, funding_amount and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    };

    SEI_INDUSTRIAL_R_D_CONTRACT = {
    key: "SEI_INDUSTRIAL_R_D_CONTRACT",
    label: "Liste des contrats de recherche industrielle",
    fileNamePattern: [
        /^sei_industrial_r_d_contract_2*.csv/,
    ],
    fields: [
        "id_contract",
        "contract_start_date",
        "pi_name",
        "name_company_involved",
        "project_title",
        "agreement_amount",
        "start_and_end_dates",
    ],
    mergingRules: [
        "Merge based on contract_start_date, name_company_involved, project_title, agreement_amount, start_and_end_dates and the PI (pi_name)"
    ],
    dependencies: [],   // ⬅️ plus de ACTIVITY ici
};



    STATUS = {
        key: "STATUS",
        label: "Liste des statuts",
        fileNamePattern: [
            /^status.*csv/,
        ],
        fields: [
            "id_status",
            "name_status"
        ],
        mergingRules: ["Merge based on name_status",
        ],
        dependencies: [],
    }

    // tool_product_cohort
    // id_activity;name_cohort;creation_date;involved_researchers_crti;description
    TOOL_PRODUCT_COHORT = {
        key: "TOOL_PRODUCT_COHORT",
        label: "Liste des cohortes",
        fileNamePattern: [
            /^tool_product_cohort.*csv/,
        ],
        fields: [
            "id_activity",
            "name_cohort",
            "creation_date",
            "involved_researchers_crti",
            "description"
        ],
        mergingRules: ["Merge based on name_cohort, creation_date, involved_researchers_crti, description and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    TOOL_PRODUCT_DATABASE = {
        key: "TOOL_PRODUCT_DATABASE",
        label: "Liste des bases de données",
        fileNamePattern: [
            /^tool_product_database.*csv/,
        ],
        fields: [
            "id_activity",
            "title_database",
            "creation_date",
            "authors",
            "description"
        ],
        mergingRules: ["Merge based on title_database, creation_date, authors, description and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    TOOL_PRODUCT_DECISION_SUPPORT_TOOL = {
        key: "TOOL_PRODUCT_DECISION_SUPPORT_TOOL",
        label: "Liste des outils de décision",
        fileNamePattern: [
            /^tool_product_decision_support_tool.*csv/,
        ],
        fields: [
            "id_activity",
            "name_decision_support_tool",
            "creation_date",
            "authors",
            "description"
        ],
        mergingRules: ["Merge based on name_decision_support_tool, creation_date, authors, description and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    }

    TOOL_PRODUCT_SOFTWARE = {
        key: "TOOL_PRODUCT_SOFTWARE",
        label: "Liste des logiciels",
        fileNamePattern: [
            /^tool_product_software.*csv/,
        ],
        fields: [
            "id_activity",
            "name_software",
            "creation_date",
            "authors",
            "description"
        ],
        mergingRules: ["Merge based on name_software, creation_date, authors, description and the researcher getting it",
        ],
        dependencies: [this.ACTIVITY],
    };
    TRAINING_THESIS = {
        key: "TRAINING_THESIS",
        label: "Training thesis list",
        fileNamePattern: [
            /^training_thesis_publication.*csv/,
        ],
        fields: [
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
        ],
        mergingRules: [
            "Merge based on id of activity type fixed by Application",
        ],
        dependencies: [this.ACTIVITY],
    };


    getDependencies(template_key) {
        let dependencies = [];
        let currentAttribute = this[template_key];
        if (!currentAttribute) {
            return dependencies;
        }
        for (let dependency of currentAttribute.dependencies) {
            dependencies.push(dependency);
            dependencies = dependencies.concat(this.getDependencies(dependency.key));
        }
        return dependencies;
    }
}

export default (new SupportedCsvTemplate())