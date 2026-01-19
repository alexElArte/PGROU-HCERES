package org.centrale.hceres.repository;

import org.centrale.hceres.items.SeiIndustrialRDContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeiIndustrialRDContractRepository extends JpaRepository<SeiIndustrialRDContract, Integer> {
}
