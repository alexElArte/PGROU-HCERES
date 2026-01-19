package org.centrale.hceres.repository;

import org.centrale.hceres.items.FunctionEditorialActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FunctionEditorialActivityRepository extends JpaRepository<FunctionEditorialActivity, Integer> {
    @Query(value = "SELECT * FROM function_editorial_activity WHERE LOWER(function_editorial_activity_name) LIKE LOWER(?1)", nativeQuery = true)
    FunctionEditorialActivity findByName(String name);
}
