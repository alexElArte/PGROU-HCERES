package org.centrale.hceres.repository;

import org.centrale.hceres.items.TypeOralComPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeOralComPosterRepository extends JpaRepository<TypeOralComPoster, Integer>{
}
