package org.centrale.hceres.repository;

import org.centrale.hceres.items.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface JournalRepository extends JpaRepository<Journal, Integer> {
    @Query(value = "SELECT * FROM journal WHERE LOWER(journal_name) LIKE LOWER(?1)", nativeQuery = true)
    Journal findByName(String name);

    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE seq_journal RESTART WITH 1", nativeQuery = true)
    void resetSequence();
}
