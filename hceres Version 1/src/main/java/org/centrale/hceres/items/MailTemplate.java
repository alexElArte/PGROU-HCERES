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
@Table(name = "mail_template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MailTemplate implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "mail_template_id")
    private Integer mailTemplateId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "mail_template_title")
    private String mailTemplateTitle;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "mail_template_content")
    private String mailTemplateContent;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mailTemplateId")
    private List<MailActivity> mailActivityList;

    public Integer getMailTemplateId() {
        return mailTemplateId;
    }

    public void setMailTemplateId(Integer mailTemplateId) {
        this.mailTemplateId = mailTemplateId;
    }

    public String getMailTemplateTitle() {
        return mailTemplateTitle;
    }

    public void setMailTemplateTitle(String mailTemplateTitle) {
        this.mailTemplateTitle = mailTemplateTitle;
    }

    public String getMailTemplateContent() {
        return mailTemplateContent;
    }

    public void setMailTemplateContent(String mailTemplateContent) {
        this.mailTemplateContent = mailTemplateContent;
    }

    public List<MailActivity> getMailActivityList() {
        return mailActivityList;
    }

    public void setMailActivityList(List<MailActivity> mailActivityList) {
        this.mailActivityList = mailActivityList;
    }
    
    
}