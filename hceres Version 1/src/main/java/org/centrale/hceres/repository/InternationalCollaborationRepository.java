package org.centrale.hceres.repository;

import org.centrale.hceres.items.InternationalCollaboration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternationalCollaborationRepository extends JpaRepository<InternationalCollaboration, Integer> {
}
