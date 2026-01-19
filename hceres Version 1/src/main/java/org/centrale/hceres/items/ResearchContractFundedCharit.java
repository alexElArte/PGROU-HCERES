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
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.io.Serializable;
    import java.util.Date;
    import javax.persistence.*;
    import javax.validation.constraints.Size;

    /**
     *
     * @author kwyhr
     */
    @Entity
    @Table(name = "research_contract_funded_public_charitable_inst")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class ResearchContractFundedCharit implements Serializable {

        private Integer idCsvResearchContractFundedCharit;

        private static final long serialVersionUID = 1L;
        @Id
        @Column(name = "id_activity")
        private Integer idActivity;

        
        @JoinColumn(name = "id_activity")
        @MapsId
        @OneToOne(cascade = CascadeType.ALL)
        @JsonIgnore
        private Activity activity;

        @Column(name = "date_contract_award")
        @Temporal(TemporalType.DATE)
        private Date dateContractAward;
        @Size(max = 256)
        @Column(name = "funding_institution")
        private String fundingInstitution;
        @Size(max = 256)
        @Column(name = "project_title")
        private String projectTitle;
        @Column(name = "start_year")
        private Integer startYear;
        @Column(name = "end_year")
        private Integer endYear;
        @Column(name = "grant_amount")
        private Integer grantAmount;


        @Column(name = "id_type")
        private Integer typeResearchContractId;

        @JoinColumn(
                name = "id_type",
                referencedColumnName = "id_type",
                insertable = false,
                updatable = false
        )
        @ManyToOne(optional = false)
        private TypeResearchContract typeResearchContract;

        public Integer getIdActivity() {
            return idActivity;
        }

        public void setIdActivity(Integer idActivity) {
            this.idActivity = idActivity;
        }

        public Activity getActivity() {
            return activity;
        }

        public void setActivity(Activity activity) {
            this.activity = activity;
        }

        public Date getDateContractAward() {
            return dateContractAward;
        }

        public void setDateContractAward(Date dateContractAward) {
            this.dateContractAward = dateContractAward;
        }

        public String getFundingInstitution() {
            return fundingInstitution;
        }

        public void setFundingInstitution(String fundingInstitution) {
            this.fundingInstitution = fundingInstitution;
        }

        public String getProjectTitle() {
            return projectTitle;
        }

        public void setProjectTitle(String projectTitle) {
            this.projectTitle = projectTitle;
        }

        public Integer getStartYear() {
            return startYear;
        }

        public void setStartYear(Integer startYear) {
            this.startYear = startYear;
        }

        public Integer getEndYear() {
            return endYear;
        }

        public void setEndYear(Integer endYear) {
            this.endYear = endYear;
        }

        public Integer getGrantAmount() {
            return grantAmount;
        }

        public void setGrantAmount(Integer grantAmount) {
            this.grantAmount = grantAmount;
        }

        public Integer getTypeResearchContractId() {
            return typeResearchContractId;
        }

        public void setTypeResearchContractId(Integer typeResearchContractId) {
            this.typeResearchContractId = typeResearchContractId;
        }

        public TypeResearchContract getTypeResearchContract() {
            return typeResearchContract;
        }

        public void setTypeResearchContract(TypeResearchContract typeResearchContract) {
            this.typeResearchContract = typeResearchContract;
        }

    public Integer getIdCsvResearchContractFundedCharit() {
        return idCsvResearchContractFundedCharit;
    }

    public void setIdCsvResearchContractFundedCharit(Integer idCsvResearchContractFundedCharit) {
        this.idCsvResearchContractFundedCharit = idCsvResearchContractFundedCharit;
    }
        


    }