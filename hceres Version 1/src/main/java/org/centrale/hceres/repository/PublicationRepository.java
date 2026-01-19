package org.centrale.hceres.repository;

import org.centrale.hceres.items.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Integer> {
}
