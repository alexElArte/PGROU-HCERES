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
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "mail_activity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MailActivity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "mail_activity_id")
    private Integer mailActivityId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "mail_activity_date")
    @Temporal(TemporalType.DATE)
    private Date mailActivityDate;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity")
    @ManyToOne(optional = false)
    private Activity idActivity;
    @JoinColumn(name = "mail_template_id", referencedColumnName = "mail_template_id")
    @ManyToOne(optional = false)
    private MailTemplate mailTemplateId;

    public Integer getMailActivityId() {
        return mailActivityId;
    }

    public void setMailActivityId(Integer mailActivityId) {
        this.mailActivityId = mailActivityId;
    }

    public Date getMailActivityDate() {
        return mailActivityDate;
    }

    public void setMailActivityDate(Date mailActivityDate) {
        this.mailActivityDate = mailActivityDate;
    }

    public Activity getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(Activity idActivity) {
        this.idActivity = idActivity;
    }

    public MailTemplate getMailTemplateId() {
        return mailTemplateId;
    }

    public void setMailTemplateId(MailTemplate mailTemplateId) {
        this.mailTemplateId = mailTemplateId;
    }
    
    
}