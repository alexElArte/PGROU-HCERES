/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.items;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Max
 */
@Entity
@Table(name = "training_thesis")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TrainingThesis.findAll", query = "SELECT t FROM TrainingThesis t"),
    @NamedQuery(name = "TrainingThesis.findByIdActivity", query = "SELECT t FROM TrainingThesis t WHERE t.idActivity = :idActivity"),
    @NamedQuery(name = "TrainingThesis.findByThesisStart", query = "SELECT t FROM TrainingThesis t WHERE t.thesisStart = :thesisStart"),
    @NamedQuery(name = "TrainingThesis.findByThesisTypeId", query = "SELECT t FROM TrainingThesis t WHERE t.thesisTypeId = :thesisTypeId"),
    @NamedQuery(name = "TrainingThesis.findByThesisMainFunding", query = "SELECT t FROM TrainingThesis t WHERE t.thesisMainFunding = :thesisMainFunding"),
    @NamedQuery(name = "TrainingThesis.findByThesisDefenseDate", query = "SELECT t FROM TrainingThesis t WHERE t.thesisDefenseDate = :thesisDefenseDate"),
    @NamedQuery(name = "TrainingThesis.findByThesisDuration", query = "SELECT t FROM TrainingThesis t WHERE t.thesisDuration = :thesisDuration"),
    @NamedQuery(name = "TrainingThesis.findByThesisFutur", query = "SELECT t FROM TrainingThesis t WHERE t.thesisFutur = :thesisFutur"),
    @NamedQuery(name = "TrainingThesis.findByThesisNumberArticles", query = "SELECT t FROM TrainingThesis t WHERE t.thesisNumberArticles = :thesisNumberArticles"),
    @NamedQuery(name = "TrainingThesis.findByThesisNumberArticlesFirstSecondPosition", query = "SELECT t FROM TrainingThesis t WHERE t.thesisNumberArticlesFirstSecondPosition = :thesisNumberArticlesFirstSecondPosition"),
    @NamedQuery(name = "TrainingThesis.findByThesisArticlesFirstSecondPositionReferences", query = "SELECT t FROM TrainingThesis t WHERE t.thesisArticlesFirstSecondPositionReferences = :thesisArticlesFirstSecondPositionReferences")})
public class TrainingThesis implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "thesis_start")
    @Temporal(TemporalType.DATE)
    private Date thesisStart;
    @Basic(optional = false)
    @NotNull
    @Column(name = "thesis_type_id")
    private int thesisTypeId;
    @Size(max = 2048)
    @Column(name = "thesis_main_funding")
    private String thesisMainFunding;
    @Column(name = "thesis_defense_date")
    @Temporal(TemporalType.DATE)
    private Date thesisDefenseDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "thesis_duration")
    private int thesisDuration;
    @Size(max = 2147483647)
    @Column(name = "thesis_futur")
    private String thesisFutur;
    @Column(name = "thesis_number_articles")
    private Integer thesisNumberArticles;
    @Column(name = "thesis_number_articles_first_second_position")
    private Integer thesisNumberArticlesFirstSecondPosition;
    @Size(max = 2147483647)
    @Column(name = "thesis_articles_first_second_position_references")
    private String thesisArticlesFirstSecondPositionReferences;
    
    
    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;
    
    @JoinColumn(name = "phd_student_id", referencedColumnName = "phd_student_id", nullable = false)
    @ManyToOne(optional = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private PhdStudent phdStudentId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "trainingThesis")
    private Collection<ThesisAssociatedCompany> thesisAssociatedCompanyCollection;

    public TrainingThesis() {
    }

    public TrainingThesis(Integer idActivity) {
        this.idActivity = idActivity;
    }

    public TrainingThesis(Integer idActivity, Date thesisStart, int thesisTypeId, int thesisDuration) {
        this.idActivity = idActivity;
        this.thesisStart = thesisStart;
        this.thesisTypeId = thesisTypeId;
        this.thesisDuration = thesisDuration;
    }

    public Integer getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    }

    public Date getThesisStart() {
        return thesisStart;
    }

    public void setThesisStart(Date thesisStart) {
        this.thesisStart = thesisStart;
    }

    public int getThesisTypeId() {
        return thesisTypeId;
    }

    public void setThesisTypeId(int thesisTypeId) {
        this.thesisTypeId = thesisTypeId;
    }

    public String getThesisMainFunding() {
        return thesisMainFunding;
    }

    public void setThesisMainFunding(String thesisMainFunding) {
        this.thesisMainFunding = thesisMainFunding;
    }

    public Date getThesisDefenseDate() {
        return thesisDefenseDate;
    }

    public void setThesisDefenseDate(Date thesisDefenseDate) {
        this.thesisDefenseDate = thesisDefenseDate;
    }

    public int getThesisDuration() {
        return thesisDuration;
    }

    public void setThesisDuration(int thesisDuration) {
        this.thesisDuration = thesisDuration;
    }

    public String getThesisFutur() {
        return thesisFutur;
    }

    public void setThesisFutur(String thesisFutur) {
        this.thesisFutur = thesisFutur;
    }

    public Integer getThesisNumberArticles() {
        return thesisNumberArticles;
    }

    public void setThesisNumberArticles(Integer thesisNumberArticles) {
        this.thesisNumberArticles = thesisNumberArticles;
    }

    public Integer getThesisNumberArticlesFirstSecondPosition() {
        return thesisNumberArticlesFirstSecondPosition;
    }

    public void setThesisNumberArticlesFirstSecondPosition(Integer thesisNumberArticlesFirstSecondPosition) {
        this.thesisNumberArticlesFirstSecondPosition = thesisNumberArticlesFirstSecondPosition;
    }

    public String getThesisArticlesFirstSecondPositionReferences() {
        return thesisArticlesFirstSecondPositionReferences;
    }

    public void setThesisArticlesFirstSecondPositionReferences(String thesisArticlesFirstSecondPositionReferences) {
        this.thesisArticlesFirstSecondPositionReferences = thesisArticlesFirstSecondPositionReferences;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public PhdStudent getPhdStudentId() {
        return phdStudentId;
    }

    public void setPhdStudentId(PhdStudent phdStudentId) {
        this.phdStudentId = phdStudentId;
    }

    @XmlTransient
    public Collection<ThesisAssociatedCompany> getThesisAssociatedCompanyCollection() {
        return thesisAssociatedCompanyCollection;
    }

    public void setThesisAssociatedCompanyCollection(Collection<ThesisAssociatedCompany> thesisAssociatedCompanyCollection) {
        this.thesisAssociatedCompanyCollection = thesisAssociatedCompanyCollection;
    }

    
}
