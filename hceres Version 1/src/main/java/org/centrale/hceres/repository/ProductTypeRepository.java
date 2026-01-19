package org.centrale.hceres.repository;
import org.centrale.hceres.items.ToolProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ToolProductType, Integer> {
    
}
