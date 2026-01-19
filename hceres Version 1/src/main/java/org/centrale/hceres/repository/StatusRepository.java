package org.centrale.hceres.repository;

import org.centrale.hceres.items.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface StatusRepository extends JpaRepository<Status, Integer> {

    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE  seq_status RESTART WITH 1", nativeQuery = true)
    void resetSequence();
}