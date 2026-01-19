package org.centrale.hceres.repository;

import org.centrale.hceres.items.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface InstitutionRepository extends JpaRepository<Institution, Integer> {
    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE  seq_institution RESTART WITH 1", nativeQuery = true)
    void resetSequence();
}