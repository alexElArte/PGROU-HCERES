package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvActivity;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.JournalRepository;
import org.centrale.hceres.repository.LanguageRepository;
import org.centrale.hceres.service.csv.util.CsvTemplateException;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;
import org.centrale.hceres.dto.csv.CsvTrainingThesis;
import static org.centrale.hceres.service.csv.util.SupportedCsvTemplate.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST;

@Service
public class DataImporterService {

    @Autowired
    private ImportCsvPostDoc importCsvPostDoc;

    @Autowired
    private ImportCsvResearcher importCsvResearcher;

    @Autowired
    private ImportCsvNationality importCsvNationality;

    @Autowired
    private ImportCsvInstitution importCsvInstitution;
    @Autowired
    private ImportCsvThesisType importCsvThesisType;

    @Autowired
    private ImportCsvLaboratory importCsvLaboratory;

    @Autowired
    private ImportCsvTeam importCsvTeam;

    @Autowired
    private ImportCsvBelongsTeam importCsvBelongsTeam;

    @Autowired
    private ImportCsvTypeActivity importCsvTypeActivity;

    @Autowired
    private ImportCsvActivity importCsvActivity;

    @Autowired
    private ImportCsvSrAward importCsvSrAward;
    //@Autowired
    //private ImportCsvBook importCsvBook;
    //@Autowired
    //private ImportCsvInvitedOralCommunication importCsvInvitedOralCommunication;
    //@Autowired
    //private ImportCsvOralComPoster importCsvOralComPoster;
//    @Autowired
//    private ImportCsvMeetingCongressOrg importCsvMeetingCongressOrg;
//
//    @Autowired
//    private ImportCsvInvitedSeminar importCsvInvitedSeminar;
    @Autowired
    private ImportCsvLanguage importCsvLanguage;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private JournalRepository journalRepository;

//    @Autowired
//    private ImportCsvPublicationType importCsvPublicationType;
//
//    @Autowired
//    private ImportCsvPublication importCsvPublication;
    @Autowired
    private ImportCsvStatus importCsvStatus;
//
//    @Autowired
//    private ImportCsvSeiClinicalTrial importCsvSeiClinicalTrial;
//
//    @Autowired
//    private ImportCsvPlatform importCsvPlatform;
    @Autowired
    private ImportCsvSeiIndustrialRDContract importCsvSeiIndustrialRDContract;
//
//    //@Autowired
//    //private ImportCsvToolProduct importCsvToolProduct;
//    //@Autowired
//    //private ImportCsvReviewArticle importCsvReviewArticle;
//    //@Autowired
//    //private ImportCsvEditorialActivity importCsvEditorialActivity;
    ////    @Autowired
////    private ImportCsvEducationalOutput importCsvEducationalOutput;
//    @Autowired
//    private ImportCsvInvolvementTrainingPedagogical importCsvInvolvementTrainingPedagogical;

    //@Autowired
    //private ImportCsvInternationalCollaboration importCsvInternationalCollaboration;
//    @Autowired
//    private ImportCsvPublicOutreach importCsvPublicOutreach;
    @Autowired
    private ImportCsvResearchContractFundedCharit importCsvResearchContractFundedCharit;

//    @Autowired
//    private ImportCsvScientificExpertise importCsvScientificExpertise;
//
//    @Autowired
//    private ImportCsvLearnedScientificSociety importCsvLearnedScientificSociety;
//
//    @Autowired
//    private ImportCsvInstitutionalComitee importCsvInstitutionalComitee;
    @Autowired
    private ImportCsvTrainingThesis importCsvTrainingThesis;

    /**
     * @param request map from csv format to list of csv rows
     * @return summary of import
     * @throws CsvTemplateException if csv format is not supported
     */
    public synchronized ImportCsvSummary importCsvData(@RequestBody Map<String, Object> request)
            throws CsvTemplateException {
        // reorder the map based on dependencies of csv format
        Map<SupportedCsvTemplate, List<?>> csvDataRequest = new TreeMap<>(SupportedCsvTemplate::compare);
        LanguageCreatorCacheService languageCreatorCacheService = new LanguageCreatorCacheService(languageRepository);
        JournalCreatorCache journalCreatorCache = new JournalCreatorCache(journalRepository);
        for (Map.Entry<String, Object> entry : request.entrySet()) {
            String csvFormat = entry.getKey();
            List<?> csvList = (List<?>) entry.getValue();
            try {
                SupportedCsvTemplate supportedCsvTemplate = SupportedCsvTemplate.valueOf(csvFormat);
                csvDataRequest.put(supportedCsvTemplate, csvList);
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
                throw new CsvTemplateException(csvFormat + " format is not yet implemented in backend!");
            }
        }

        ImportCsvSummary importCsvSummary = new ImportCsvSummary();
        Map<Integer, GenericCsv<Researcher, Integer>> csvIdToResearcherMap = null;
        Map<Integer, GenericCsv<Institution, Integer>> csvIdToInstitutionMap = null;
        Map<Integer, GenericCsv<Status, Integer>> csvIdToStatusMap = null;
        Map<Integer, GenericCsv<PublicationType, Integer>> csvIdToPublicationTypeMap = null;
        Map<Integer, GenericCsv<ThesisType, Integer>> csvIdToThesisTypeMap = null;
        Map<Integer, GenericCsv<Laboratory, Integer>> csvIdToLaboratoryMap = null;
        Map<Integer, GenericCsv<Team, Integer>> csvIdToTeamMap = null;
        Map<Integer, GenericCsv<BelongsTeam, Integer>> csvIdToBelongsTeamMap = null;
        Map<Integer, GenericCsv<Nationality, Integer>> csvIdToNationalityMap = null;
        Map<Integer, GenericCsv<TypeActivity, Integer>> csvIdToTypeActivityMap = null;
        Map<TypeActivityId, Map<Integer, CsvActivity>> activityMap = null;
        Map<Integer, CsvActivity> specificActivityMap = null;
        for (Map.Entry<SupportedCsvTemplate, List<?>> entry : csvDataRequest.entrySet()) {
            SupportedCsvTemplate supportedCsvTemplate = entry.getKey();
            List<?> csvList = entry.getValue();
            switch (supportedCsvTemplate) {
                case RESEARCHER:
                    csvIdToResearcherMap = importCsvResearcher.importCsvList(csvList, importCsvSummary);
                    break;
                case INSTITUTION:
                    csvIdToInstitutionMap = importCsvInstitution.importCsvList(csvList, importCsvSummary);
                    break;

                case LABORATORY:
                    csvIdToLaboratoryMap = importCsvLaboratory.importCsvList(
                            csvList, importCsvSummary, csvIdToInstitutionMap
                    );
                    break;

                case TEAM:
                    csvIdToTeamMap = importCsvTeam.importCsvList(
                            csvList, importCsvSummary, csvIdToLaboratoryMap
                    );
                    break;
                case BELONG_TEAM:
                    assert csvIdToTeamMap != null;
                    csvIdToBelongsTeamMap = importCsvBelongsTeam.importCsvList(csvList,
                            importCsvSummary,
                            csvIdToResearcherMap,
                            csvIdToTeamMap);
                    break;
                case NATIONALITY:
                    csvIdToNationalityMap = importCsvNationality.importCsvList(csvList, importCsvSummary);
                    break;
                case TYPE_ACTIVITY:
                    csvIdToTypeActivityMap = importCsvTypeActivity.importCsvList(csvList, importCsvSummary);
                    break;
                case ACTIVITY:
                    activityMap = importCsvActivity.importCsvList(csvList,
                            importCsvSummary,
                            csvIdToResearcherMap,
                            csvIdToTypeActivityMap);
                    break;
                case SR_AWARD:
                    importCsvSrAward.importCsvList(csvList, importCsvSummary, specificActivityMap);
                    break;
//                case BOOK:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.BOOK, k -> new HashMap<>());
//                    importCsvBook.importCsvList(csvList, importCsvSummary,
//                            specificActivityMap,
//                            languageCreatorCache);
//                    break;
//                case INVITED_ORAL_COMMUNICATION:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.INVITED_ORAL_COMMUNICATION, k -> new HashMap<>());
//                    importCsvInvitedOralCommunication.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;

//                case ORAL_COMMUNICATION_POSTER:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.ORAL_COMMUNICATION_POSTER, k -> new HashMap<>());
//                    importCsvOralComPoster.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case MEETING_CONGRESS_ORG:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.MEETING_CONGRESS_ORG, k -> new HashMap<>());
//                    importCsvMeetingCongressOrg.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case INVITED_SEMINAR:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.INVITED_SEMINAR, k -> new HashMap<>());
//                    importCsvInvitedSeminar.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
                case LANGUAGE:
                    importCsvLanguage.importCsvList(csvList, importCsvSummary);
                    break;
                case THESIS_TYPE:
                    importCsvThesisType.importCsvList(csvList, importCsvSummary);
                    break;
//                case PUBLICATION_TYPE:
//                    csvIdToPublicationTypeMap = importCsvPublicationType.importCsvList(csvList, importCsvSummary);
//                    break;
//                case PUBLICATION:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.PUBLICATION, k -> new HashMap<>());
//                    importCsvPublication.importCsvList(csvList, importCsvSummary,
//                            specificActivityMap,
//                            csvIdToPublicationTypeMap);
//                    break;
                case STATUS:
                    importCsvStatus.importCsvList(csvList, importCsvSummary);
                    break;
//                case SEI_CLINICAL_TRIAL:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.SEI_CLINICAL_TRIAL, k -> new HashMap<>());
//                    importCsvSeiClinicalTrial.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case PLATFORM:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.PLATFORM, k -> new HashMap<>());
//                    importCsvPlatform.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
                case SEI_INDUSTRIAL_R_D_CONTRACT:
                    importCsvSeiIndustrialRDContract.importCsvList(csvList, importCsvSummary);
                    break;

//                case TOOL_PRODUCT_COHORT:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.TOOL_PRODUCT_COHORT, k -> new HashMap<>());
//                    importCsvToolProduct.importCsvList(csvList, importCsvSummary, specificActivityMap,
//                            ToolProductType.IdToolProductType.COHORT,
//                            supportedCsvTemplate);
//                    break;
//                case TOOL_PRODUCT_DATABASE:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.TOOL_PRODUCT_DATABASE, k -> new HashMap<>());
//                    importCsvToolProduct.importCsvList(csvList, importCsvSummary, specificActivityMap,
//                            ToolProductType.IdToolProductType.DATABASE,
//                            supportedCsvTemplate);
//                    break;
//                case TOOL_PRODUCT_SOFTWARE:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.TOOL_PRODUCT_SOFTWARE, k -> new HashMap<>());
//                    importCsvToolProduct.importCsvList(csvList, importCsvSummary, specificActivityMap,
//                            ToolProductType.IdToolProductType.SOFTWARE,
//                            supportedCsvTemplate);
//                    break;
//                case TOOL_PRODUCT_DECISION_SUPPORT_TOOL:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.TOOL_PRODUCT_DECISION_SUPPORT_TOOL, k -> new HashMap<>());
//                    importCsvToolProduct.importCsvList(csvList, importCsvSummary, specificActivityMap,
//                            ToolProductType.IdToolProductType.DECISION_SUPPORT_TOOL,
//                            supportedCsvTemplate);
//                    break;
//                case REVIEWING_JOURNAL_ARTICLES:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.REVIEWING_JOURNAL_ARTICLES, k -> new HashMap<>());
//                    importCsvReviewArticle.importCsvList(csvList, importCsvSummary,
//                            specificActivityMap,
//                            journalCreatorCache);
//                    break;
//                case EDITORIAL_ACTIVITY:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.EDITORIAL_ACTIVITY, k -> new HashMap<>());
//                    importCsvEditorialActivity.importCsvList(csvList, importCsvSummary, specificActivityMap, journalCreatorCache);
//                    break;
//                case EDUCATIONAL_OUTPUT:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.EDUCATIONAL_OUTPUT, k -> new HashMap<>());
//                    importCsvEducationalOutput.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case INVOLVEMENT_TRAINING_PEDAGOGICAL_RESPONSIBILITY:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.INVOLVEMENT_TRAINING_PEDAGOGICAL_RESPONSIBILITY, k -> new HashMap<>());
//                    importCsvInvolvementTrainingPedagogical.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case NATIONAL_INTERNATIONAL_COLLABORATION:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.NATIONAL_INTERNATIONAL_COLLABORATION, k -> new HashMap<>());
//                    importCsvInternationalCollaboration.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case PUBLIC_OUTREACH:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.PUBLIC_OUTREACH, k -> new HashMap<>());
//                    importCsvPublicOutreach.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
                case RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST:
                    assert activityMap != null;

                    // 1) Sélectionner la map spécifique pour ce type d’activité
                    specificActivityMap = activityMap.computeIfAbsent(
                            TypeActivityId.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST,
                            k -> new HashMap<>()
                    );

                    // 2) Lancer l’import avec ta classe CsvTrainingThesis
                    importCsvResearchContractFundedCharit.importCsvList(csvList, importCsvSummary, specificActivityMap);
                    break;

//                case SCIENTIFIC_EXPERTISE:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.SCIENTIFIC_EXPERTISE, k -> new HashMap<>());
//                    importCsvScientificExpertise.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case SR_RESPONSIBILITY_LEARNED_SCIENTIFIC_SOCIETY:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.SR_RESPONSIBILITY_LEARNED_SCIENTIFIC_SOCIETY, k -> new HashMap<>());
//                    importCsvLearnedScientificSociety.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
//                case RESPONSIBILITY_INSTITUTIONAL_COMITEE_JURY:
//                    assert activityMap != null;
//                    specificActivityMap = activityMap.computeIfAbsent(TypeActivityId.RESPONSIBILITY_INSTITUTIONAL_COMITEE_JURY, k -> new HashMap<>());
//                    importCsvInstitutionalComitee.importCsvList(csvList, importCsvSummary, specificActivityMap);
//                    break;
                case TRAINING_THESIS:
                    assert activityMap != null;

                    // 1) Sélectionner la map spécifique pour ce type d’activité
                    specificActivityMap = activityMap.computeIfAbsent(
                            TypeActivityId.TRAINING_THESIS_PUBLICATION,
                            k -> new HashMap<>()
                    );

                    // 2) Lancer l’import avec ta classe CsvTrainingThesis
                    importCsvTrainingThesis.importCsvList(csvList, importCsvSummary, specificActivityMap);
                    break;
                case POSTDOC:
                    assert activityMap != null;

                    // 1) Sélectionner la map spécifique pour ce type d’activité
                    specificActivityMap = activityMap.computeIfAbsent(
                            TypeActivityId.POST_DOC,
                            k -> new HashMap<>()
                    );
                    importCsvPostDoc.importCsvList(csvList, importCsvSummary, specificActivityMap);
                    break;
                default:
                    break;
            }
        }
        importCsvSummary.updateActivityMetric();
        return importCsvSummary;
    }
}
