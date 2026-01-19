package org.centrale.hceres.repository;
import org.centrale.hceres.items.ToolProductRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRoleRepository extends JpaRepository<ToolProductRole, Integer>{
    
}
