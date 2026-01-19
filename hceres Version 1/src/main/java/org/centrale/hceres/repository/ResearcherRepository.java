/* --------------------------------------------------------------------------------
 * Projet HCERES
 *
 * Gestion de données pour l'HCERES
 *
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
package org.centrale.hceres.repository;

import java.util.List;
import org.centrale.hceres.items.Researcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ECN
 */
@Repository
public interface ResearcherRepository extends JpaRepository<Researcher, Integer> {

    @Query("FROM Researcher WHERE researcherLogin=:researcherLogin")
    Researcher findByLogin(@Param("researcherLogin") String researcherLogin);
    
    List<Researcher> findByResearcherSurname(String surname);

    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE  seq_researcher RESTART WITH 1", nativeQuery = true)
    void resetSequence();

}
