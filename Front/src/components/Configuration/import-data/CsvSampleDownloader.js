import ResearcherCsv from "../../../assets/csvSamples/researcher.csv";
import InstitutionCsv from "../../../assets/csvSamples/institution.csv";
import LaboratoryCsv from "../../../assets/csvSamples/laboratory.csv";
import TeamCsv from "../../../assets/csvSamples/team.csv";
import BelongsTeamCsv from "../../../assets/csvSamples/belongs_team.csv";
import TypeActivityCsv from "../../../assets/csvSamples/type_activity.csv";
import ActivityCsv from "../../../assets/csvSamples/activity.csv";
import SrAwardCsv from "../../../assets/csvSamples/sr_award.csv";
import BookCsv from "../../../assets/csvSamples/book.csv";
import InvitedOralCommunicationCsv from "../../../assets/csvSamples/invited_oral_communication.csv";
import MeetingCongressOrgCsv from "../../../assets/csvSamples/meeting_congress_org.csv";
import InvitedSeminarCsv from "../../../assets/csvSamples/invited_seminar.csv";
import LanguageCsv from "../../../assets/csvSamples/language.csv";
import NationalityCsv from "../../../assets/csvSamples/nationality.csv";
import PhdTypeCsv from "../../../assets/csvSamples/phd_type.csv";
import PublicationTypeCsv from "../../../assets/csvSamples/publication_type.csv";
import PublicationCsv from "../../../assets/csvSamples/publication.csv";
import StatusCsv from "../../../assets/csvSamples/status.csv";
import SeiClinicalTrialCsv from "../../../assets/csvSamples/sei_clinical_trial.csv";
import PlatformCsv from "../../../assets/csvSamples/platform.csv";
import SeiIndustrialRDContractCsv from "../../../assets/csvSamples/sei_industrial_r_d_contract.csv";
import ToolProductCohortCsv from "../../../assets/csvSamples/tool_product_cohort.csv";
import ToolProductDatabaseCsv from "../../../assets/csvSamples/tool_product_database.csv";
import ToolProductDecisionSupportToolCsv from "../../../assets/csvSamples/tool_product_decision_support_tool.csv";
import ToolProductSoftwareCsv from "../../../assets/csvSamples/tool_product_software.csv";
import ReviewingJournalArticlesCsv from "../../../assets/csvSamples/reviewing_journal_articles.csv";
import EditorialActivityCsv from "../../../assets/csvSamples/editorial_activity.csv";
import EducationalOutputCsv from "../../../assets/csvSamples/educational_output.csv";
import InvolvementTrainingPedagogicalResponsibilityCsv from "../../../assets/csvSamples/involvement_training_pedagogical_responsibility.csv";
import NationalInternationalCollaborationCsv from "../../../assets/csvSamples/national_international_collaboration.csv";
import PublicOutreachCsv from "../../../assets/csvSamples/public_outreach.csv";
import ResearchContractFundedPublicCharitableInstCsv from "../../../assets/csvSamples/research_contract_funded_public_charitable_inst.csv";
import ScientificExpertiseCsv from "../../../assets/csvSamples/scientific_expertise.csv";
import LearnedScientificSocietyCsv from "../../../assets/csvSamples/sr_responsibility_learned_scientific_society.csv";
import InstitutionalComiteeCsv from "../../../assets/csvSamples/responsibility_institutional_comitee_jury.csv";
import TrainingThesis from "../../../assets/csvSamples/training_thesis.csv"
import PostDoc from "../../../assets/csvSamples/postdoc_senior.csv"
import React from "react";

// <a href={Logo} download>Download File</a>

export default function CsvSampleDownloader() {
    const supportedCsvSample = [
        ResearcherCsv,
        InstitutionCsv,
        LaboratoryCsv,
        TeamCsv,
        BelongsTeamCsv,
        TypeActivityCsv,
        ActivityCsv,
        SrAwardCsv,
        //BookCsv,
        //InvitedOralCommunicationCsv,
        //MeetingCongressOrgCsv,
        //InvitedSeminarCsv,
        LanguageCsv,
        NationalityCsv,
        PhdTypeCsv,
        //PublicationTypeCsv,
        //PublicationCsv,
        StatusCsv,
        //SeiClinicalTrialCsv,
        //PlatformCsv,
        SeiIndustrialRDContractCsv,
        //ToolProductCohortCsv,
        //ToolProductDatabaseCsv,
        //ToolProductDecisionSupportToolCsv,
        //ToolProductSoftwareCsv,
        //ReviewingJournalArticlesCsv,
        //EditorialActivityCsv,
        //EducationalOutputCsv,
        //InvolvementTrainingPedagogicalResponsibilityCsv,
        //NationalInternationalCollaborationCsv,
        //PublicOutreachCsv,
        ResearchContractFundedPublicCharitableInstCsv,
        //ScientificExpertiseCsv,
        //LearnedScientificSocietyCsv,
        //InstitutionalComiteeCsv,
        TrainingThesis,
        PostDoc,
    ]

    return supportedCsvSample.map((file) => {
        return <iframe src={file}
                       title={file}
                       key={file}
                       style={{display: "none"}}></iframe>
    })
}