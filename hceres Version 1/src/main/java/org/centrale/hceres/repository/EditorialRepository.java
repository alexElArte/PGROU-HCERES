package org.centrale.hceres.repository;

import org.centrale.hceres.items.EditorialActivity;
import org.centrale.hceres.service.EditorialService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EditorialRepository extends JpaRepository<EditorialActivity, Integer> {
}
