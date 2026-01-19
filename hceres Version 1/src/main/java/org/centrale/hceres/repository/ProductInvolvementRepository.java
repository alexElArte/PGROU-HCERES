package org.centrale.hceres.repository;
import org.centrale.hceres.items.ToolProductInvolvement;
import org.centrale.hceres.items.ToolProductInvolvementPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductInvolvementRepository extends JpaRepository<ToolProductInvolvement, Integer> {
    
}
