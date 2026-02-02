/* --------------------------------------------------------------------------------
 * Projet HCERES
 *
 * Gestion de données pour l'HCERES
 *
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
package org.centrale.hceres.items;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

/**
 * @author kwyhr
 */
@Entity
@Table(name = "activity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Activity implements Serializable {

    //@JsonIgnore si il y a des boucles infinies. Attention, ici, on bloque la receptions des données des activités (Par ex : on reçoit que les chercheur, pas les attributs de sa publication)
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private TrainingThesis trainingThesis;
    
    
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_activity")
    private Integer idActivity;

    @Column(name = "id_type_activity")
    private Integer idTypeActivity;

    @JoinColumn(name = "id_type_activity", referencedColumnName = "id_type_activity", insertable = false, updatable = false)
    @ManyToOne
    private TypeActivity typeActivity;

    public void setTypeActivity(TypeActivity typeActivity) {
        this.typeActivity = typeActivity;
        if (typeActivity != null) setIdTypeActivity(typeActivity.getIdTypeActivity());
    }

    @JoinTable(name = "activity_researcher", joinColumns = {
            @JoinColumn(name = "id_activity", referencedColumnName = "id_activity")}, inverseJoinColumns = {
            @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")})
    @ManyToMany
    @JsonManagedReference
    private List<Researcher> researcherList;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private IncomingMobility incomingMobility;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Education education;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idActivity")
    @JsonIgnore
    private List<MailActivity> mailActivityList;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private InternationalCollaboration internationalCollaboration;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Publication publication;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ScientificExpertise scientificExpertise;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private InvolvementTrainingPedagogical involvementTrainingPedagogical;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private CompanyCreation companyCreation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private LabcomCreation labcomCreation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SrAward srAward;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private PublicOutreach publicOutreach;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ReviewArticle ReviewArticle;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private EvaluationThesis evaluationThesis;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private SeiNetworkUnitCreation seiNetworkUnitCreation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private ToolProduct toolProduct;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private PostDoc postDoc;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Patent patent;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    //@JsonIgnore
    private Book book;
    

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private InvitedSeminar invitedSeminar;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private MeetingCongressOrg meetingCongressOrg;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    //@JsonIgnore
    private BookChapter bookChapter;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Platform platform;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private Network network;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private InstitutionalComitee institutionalComitee;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private OutgoingMobility outgoingMobility;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private EditorialActivity editorialActivity;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private EducationalOutput educationalOutput;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiIndustrialRDContract seiIndustrialRDContract;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private ProjectEvaluation projectEvaluation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private LaboratoryEvaluation laboratoryEvaluation;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiClinicalTrial seiClinicalTrial;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private OralComPoster oralComPoster;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ResearchContractFundedCharit researchContractFundedCharit;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private SeiLeadConsortiumIndustry seiLeadConsortiumIndustry;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private SeiCifreFellowship seiCifreFellowship;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    @JsonIgnore
    private LearnedScientificSociety learnedScientificSociety;

    public Integer getIdActivity() {
        return idActivity;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public TypeActivity getTypeActivity() {
        return typeActivity;
    }

    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    }

    public Integer getIdTypeActivity() {
        return idTypeActivity;
    }

    public void setIdTypeActivity(Integer idTypeActivity) {
        this.idTypeActivity = idTypeActivity;
    }

    public List<Researcher> getResearcherList() {
        return researcherList;
    }

    public void setResearcherList(List<Researcher> researcherList) {
        this.researcherList = researcherList;
    }

    public IncomingMobility getIncomingMobility() {
        return incomingMobility;
    }

    public void setIncomingMobility(IncomingMobility incomingMobility) {
        this.incomingMobility = incomingMobility;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public List<MailActivity> getMailActivityList() {
        return mailActivityList;
    }

    public void setMailActivityList(List<MailActivity> mailActivityList) {
        this.mailActivityList = mailActivityList;
    }

    public InternationalCollaboration getInternationalCollaboration() {
        return internationalCollaboration;
    }

    public void setInternationalCollaboration(InternationalCollaboration internationalCollaboration) {
        this.internationalCollaboration = internationalCollaboration;
    }

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public ScientificExpertise getScientificExpertise() {
        return scientificExpertise;
    }

    public void setScientificExpertise(ScientificExpertise scientificExpertise) {
        this.scientificExpertise = scientificExpertise;
    }

    public InvolvementTrainingPedagogical getInvolvementTrainingPedagogical() {
        return involvementTrainingPedagogical;
    }

    public void setInvolvementTrainingPedagogical(InvolvementTrainingPedagogical involvementTrainingPedagogical) {
        this.involvementTrainingPedagogical = involvementTrainingPedagogical;
    }

    public CompanyCreation getCompanyCreation() {
        return companyCreation;
    }

    public void setCompanyCreation(CompanyCreation companyCreation) {
        this.companyCreation = companyCreation;
    }

    public LabcomCreation getLabcomCreation() {
        return labcomCreation;
    }

    public void setLabcomCreation(LabcomCreation labcomCreation) {
        this.labcomCreation = labcomCreation;
    }

    public SrAward getSrAward() {
        return srAward;
    }

    public void setSrAward(SrAward srAward) {
        this.srAward = srAward;
    }

    public PublicOutreach getPublicOutreach() {
        return publicOutreach;
    }

    public void setPublicOutreach(PublicOutreach publicOutreach) {
        this.publicOutreach = publicOutreach;
    }

    public ReviewArticle getReviewArticle() {
        return ReviewArticle;
    }

    public void setReviewArticle(ReviewArticle ReviewArticle) {
        this.ReviewArticle = ReviewArticle;
    }

    public EvaluationThesis getEvaluationThesis() {
        return evaluationThesis;
    }

    public void setEvaluationThesis(EvaluationThesis evaluationThesis) {
        this.evaluationThesis = evaluationThesis;
    }

    public SeiNetworkUnitCreation getSeiNetworkUnitCreation() {
        return seiNetworkUnitCreation;
    }

    public void setSeiNetworkUnitCreation(SeiNetworkUnitCreation seiNetworkUnitCreation) {
        this.seiNetworkUnitCreation = seiNetworkUnitCreation;
    }

    public ToolProduct getToolProduct() {
        return toolProduct;
    }

    public void setToolProduct(ToolProduct toolProduct) {
        this.toolProduct = toolProduct;
    }

    public PostDoc getPostDoc() {
        return postDoc;
    }

    public void setPostDoc(PostDoc postDoc) {
        this.postDoc = postDoc;
    }

    public Patent getPatent() {
        return patent;
    }

    public void setPatent(Patent patent) {
        this.patent = patent;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public BookChapter getBookChapter() {
        return bookChapter;
    }

    public void setBookChapter(BookChapter bookChapter) {
        this.bookChapter = bookChapter;
    }

    public InvitedSeminar getInvitedSeminar() {
        return invitedSeminar;
    }

    public void setInvitedSeminar(InvitedSeminar invitedSeminar) {
        this.invitedSeminar = invitedSeminar;
    }

    public MeetingCongressOrg getMeetingCongressOrg() {
        return meetingCongressOrg;
    }

    public void setMeetingCongressOrg(MeetingCongressOrg meetingCongressOrg) {
        this.meetingCongressOrg = meetingCongressOrg;
    }

    public Platform getPlatform() {
        return platform;
    }

    public void setPlatform(Platform platform) {
        this.platform = platform;
    }

    public Network getNetwork() {
        return network;
    }

    public void setNetwork(Network network) {
        this.network = network;
    }

    public InstitutionalComitee getInstitutionalComitee() {
        return institutionalComitee;
    }

    public void setInstitutionalComitee(InstitutionalComitee institutionalComitee) {
        this.institutionalComitee = institutionalComitee;
    }

    public OutgoingMobility getOutgoingMobility() {
        return outgoingMobility;
    }

    public void setOutgoingMobility(OutgoingMobility outgoingMobility) {
        this.outgoingMobility = outgoingMobility;
    }

    public EditorialActivity getEditorialActivity() {
        return editorialActivity;
    }

    public void setEditorialActivity(EditorialActivity editorialActivity) {
        this.editorialActivity = editorialActivity;
    }

    public EducationalOutput getEducationalOutput() {
        return educationalOutput;
    }

    public void setEducationalOutput(EducationalOutput educationalOutput) {
        this.educationalOutput = educationalOutput;
    }

    public SeiIndustrialRDContract getSeiIndustrialRDContract() {
        return seiIndustrialRDContract;
    }

    public void setSeiIndustrialRDContract(SeiIndustrialRDContract seiIndustrialRDContract) {
        this.seiIndustrialRDContract = seiIndustrialRDContract;
    }

    public ProjectEvaluation getProjectEvaluation() {
        return projectEvaluation;
    }

    public void setProjectEvaluation(ProjectEvaluation projectEvaluation) {
        this.projectEvaluation = projectEvaluation;
    }

    public LaboratoryEvaluation getLaboratoryEvaluation() {
        return laboratoryEvaluation;
    }

    public void setLaboratoryEvaluation(LaboratoryEvaluation laboratoryEvaluation) {
        this.laboratoryEvaluation = laboratoryEvaluation;
    }

    public SeiClinicalTrial getSeiClinicalTrial() {
        return seiClinicalTrial;
    }

    public void setSeiClinicalTrial(SeiClinicalTrial seiClinicalTrial) {
        this.seiClinicalTrial = seiClinicalTrial;
    }

    public OralComPoster getOralComPoster() {
        return oralComPoster;
    }

    public void setOralComPoster(OralComPoster oralComPoster) {
        this.oralComPoster = oralComPoster;
    }

    public ResearchContractFundedCharit getResearchContractFundedCharit() {
        return researchContractFundedCharit;
    }

    public void setResearchContractFundedCharit(ResearchContractFundedCharit researchContractFundedCharit) {
        this.researchContractFundedCharit = researchContractFundedCharit;
    }

    public SeiLeadConsortiumIndustry getSeiLeadConsortiumIndustry() {
        return seiLeadConsortiumIndustry;
    }

    public void setSeiLeadConsortiumIndustry(SeiLeadConsortiumIndustry seiLeadConsortiumIndustry) {
        this.seiLeadConsortiumIndustry = seiLeadConsortiumIndustry;
    }

    public SeiCifreFellowship getSeiCifreFellowship() {
        return seiCifreFellowship;
    }

    public void setSeiCifreFellowship(SeiCifreFellowship seiCifreFellowship) {
        this.seiCifreFellowship = seiCifreFellowship;
    }

    public LearnedScientificSociety getLearnedScientificSociety() {
        return learnedScientificSociety;
    }

    public void setLearnedScientificSociety(LearnedScientificSociety learnedScientificSociety) {
        this.learnedScientificSociety = learnedScientificSociety;
    }

    public Activity() {
    }

    public TrainingThesis getTrainingThesis() {
        return trainingThesis;
    }

    public void setTrainingThesis(TrainingThesis trainingThesis) {
        this.trainingThesis = trainingThesis;
    }

    public Activity(TrainingThesis trainingThesis, Integer idActivity, Integer idTypeActivity, TypeActivity typeActivity, List<Researcher> researcherList, IncomingMobility incomingMobility, Education education, List<MailActivity> mailActivityList, InternationalCollaboration internationalCollaboration, Publication publication, ScientificExpertise scientificExpertise, InvolvementTrainingPedagogical involvementTrainingPedagogical, CompanyCreation companyCreation, LabcomCreation labcomCreation, SrAward srAward, PublicOutreach publicOutreach, ReviewArticle ReviewArticle, EvaluationThesis evaluationThesis, SeiNetworkUnitCreation seiNetworkUnitCreation, ToolProduct toolProduct, PostDoc postDoc, Patent patent, Book book, InvitedSeminar invitedSeminar, MeetingCongressOrg meetingCongressOrg, BookChapter bookChapter, Platform platform, Network network, InstitutionalComitee institutionalComitee, OutgoingMobility outgoingMobility, EditorialActivity editorialActivity, EducationalOutput educationalOutput, SeiIndustrialRDContract seiIndustrialRDContract, ProjectEvaluation projectEvaluation, LaboratoryEvaluation laboratoryEvaluation, SeiClinicalTrial seiClinicalTrial, OralComPoster oralComPoster, ResearchContractFundedCharit researchContractFundedCharit, SeiLeadConsortiumIndustry seiLeadConsortiumIndustry, SeiCifreFellowship seiCifreFellowship, LearnedScientificSociety learnedScientificSociety) {
        this.trainingThesis = trainingThesis;
        this.idActivity = idActivity;
        this.idTypeActivity = idTypeActivity;
        this.typeActivity = typeActivity;
        this.researcherList = researcherList;
        this.incomingMobility = incomingMobility;
        this.education = education;
        this.mailActivityList = mailActivityList;
        this.internationalCollaboration = internationalCollaboration;
        this.publication = publication;
        this.scientificExpertise = scientificExpertise;
        this.involvementTrainingPedagogical = involvementTrainingPedagogical;
        this.companyCreation = companyCreation;
        this.labcomCreation = labcomCreation;
        this.srAward = srAward;
        this.publicOutreach = publicOutreach;
        this.ReviewArticle = ReviewArticle;
        this.evaluationThesis = evaluationThesis;
        this.seiNetworkUnitCreation = seiNetworkUnitCreation;
        this.toolProduct = toolProduct;
        this.postDoc = postDoc;
        this.patent = patent;
        this.book = book;
        this.invitedSeminar = invitedSeminar;
        this.meetingCongressOrg = meetingCongressOrg;
        this.bookChapter = bookChapter;
        this.platform = platform;
        this.network = network;
        this.institutionalComitee = institutionalComitee;
        this.outgoingMobility = outgoingMobility;
        this.editorialActivity = editorialActivity;
        this.educationalOutput = educationalOutput;
        this.seiIndustrialRDContract = seiIndustrialRDContract;
        this.projectEvaluation = projectEvaluation;
        this.laboratoryEvaluation = laboratoryEvaluation;
        this.seiClinicalTrial = seiClinicalTrial;
        this.oralComPoster = oralComPoster;
        this.researchContractFundedCharit = researchContractFundedCharit;
        this.seiLeadConsortiumIndustry = seiLeadConsortiumIndustry;
        this.seiCifreFellowship = seiCifreFellowship;
        this.learnedScientificSociety = learnedScientificSociety;
    }

    
    
}
