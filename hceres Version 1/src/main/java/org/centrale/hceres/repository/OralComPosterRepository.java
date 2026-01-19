package org.centrale.hceres.repository;

import org.centrale.hceres.items.OralComPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OralComPosterRepository extends JpaRepository<OralComPoster, Integer>{
}
