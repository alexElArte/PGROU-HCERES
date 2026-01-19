package org.centrale.hceres.repository;
import org.centrale.hceres.items.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// permet d'executer les requetes sur la base de donnees
@Repository
public interface ContractRepository extends JpaRepository<Contract, Integer> {

    @Query("SELECT c FROM Contract c WHERE c.researcherId = :id")
    List<Contract> getContractsByResearcher(Integer id);
}
