package org.centrale.hceres.repository;

import org.centrale.hceres.items.TypeActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeActivityRepository extends JpaRepository<TypeActivity, Integer>{
}
