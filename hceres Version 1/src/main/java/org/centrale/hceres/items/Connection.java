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
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "connection")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Connection implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "connection_code")
    private String connectionCode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "connection_login")
    private String connectionLogin;
    @Basic(optional = false)
    @NotNull
    @Column(name = "connection_expire")
    @Temporal(TemporalType.TIMESTAMP)
    private Date connectionExpire;
    @Column(name = "connection_status")
    private Integer connectionStatus;
    @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")
    @ManyToOne
    private Researcher researcherId;

    public String getConnectionCode() {
        return connectionCode;
    }

    public void setConnectionCode(String connectionCode) {
        this.connectionCode = connectionCode;
    }

    public String getConnectionLogin() {
        return connectionLogin;
    }

    public void setConnectionLogin(String connectionLogin) {
        this.connectionLogin = connectionLogin;
    }

    public Date getConnectionExpire() {
        return connectionExpire;
    }

    public void setConnectionExpire(Date connectionExpire) {
        this.connectionExpire = connectionExpire;
    }

    public Integer getConnectionStatus() {
        return connectionStatus;
    }

    public void setConnectionStatus(Integer connectionStatus) {
        this.connectionStatus = connectionStatus;
    }

    public Researcher getResearcherId() {
        return researcherId;
    }

    public void setResearcherId(Researcher researcherId) {
        this.researcherId = researcherId;
    }
    
}