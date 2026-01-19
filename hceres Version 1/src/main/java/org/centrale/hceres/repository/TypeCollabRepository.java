package org.centrale.hceres.repository;

import org.centrale.hceres.items.TypeCollab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeCollabRepository extends JpaRepository<TypeCollab, Integer>{
}
