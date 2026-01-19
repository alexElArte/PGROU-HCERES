package org.centrale.hceres.repository;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>{

    List<Activity> findByIdTypeActivity(Integer idTypeActivity);

    // Spring va générer la requête automatiquement à partir du nom
    Activity findByIdActivity(Integer idActivity);

    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE  seq_activity RESTART WITH 1", nativeQuery = true)
    void resetSequence();
}
