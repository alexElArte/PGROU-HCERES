package org.centrale.hceres.repository;

import org.centrale.hceres.items.PostDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostDocRepository extends JpaRepository<PostDoc, Integer> {
}
