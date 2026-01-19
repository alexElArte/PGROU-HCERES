package org.centrale.hceres.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.centrale.hceres.items.PublicationType;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface PublicationTypeRepository extends JpaRepository<PublicationType, Integer> {
    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE  seq_choice_publication RESTART WITH 1", nativeQuery = true)
    void resetSequence();
}
