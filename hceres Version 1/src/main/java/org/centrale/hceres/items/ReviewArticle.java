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
import java.math.BigDecimal;
import javax.persistence.*;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "reviewing_journal_articles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewArticle implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Column(name = "year")
    private Integer year;
    @Column(name = "nb_reviewed_articles")
    private Integer nbReviewedArticles;
    @Column(name = "impact_factor")
    private BigDecimal impactFactor;

    @Column(name = "journal_id")
    private Integer journalId;

    @JoinColumn(
            name = "journal_id",
            referencedColumnName = "journal_id",
            insertable = false,
            updatable = false
    )
    @ManyToOne(optional = false)
    private Journal journal;

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

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getNbReviewedArticles() {
        return nbReviewedArticles;
    }

    public void setNbReviewedArticles(Integer nbReviewedArticles) {
        this.nbReviewedArticles = nbReviewedArticles;
    }

    public BigDecimal getImpactFactor() {
        return impactFactor;
    }

    public void setImpactFactor(BigDecimal impactFactor) {
        this.impactFactor = impactFactor;
    }

    public Integer getJournalId() {
        return journalId;
    }

    public void setJournalId(Integer journalId) {
        this.journalId = journalId;
    }

    public Journal getJournal() {
        return journal;
    }

    public void setJournal(Journal journal) {
        this.journal = journal;
    }
    
    
}