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
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "journal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Journal implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "journal_id")
    private Integer journalId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "journal_name")
    private String journalName;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "journal")
    private List<ReviewArticle> reviewArticlesList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "journal")
    private List<EditorialActivity> editorialActivityList;

    public Integer getJournalId() {
        return journalId;
    }

    public void setJournalId(Integer journalId) {
        this.journalId = journalId;
    }

    public String getJournalName() {
        return journalName;
    }

    public void setJournalName(String journalName) {
        this.journalName = journalName;
    }

    public List<ReviewArticle> getReviewArticlesList() {
        return reviewArticlesList;
    }

    public void setReviewArticlesList(List<ReviewArticle> reviewArticlesList) {
        this.reviewArticlesList = reviewArticlesList;
    }

    public List<EditorialActivity> getEditorialActivityList() {
        return editorialActivityList;
    }

    public void setEditorialActivityList(List<EditorialActivity> editorialActivityList) {
        this.editorialActivityList = editorialActivityList;
    }
    
    
}