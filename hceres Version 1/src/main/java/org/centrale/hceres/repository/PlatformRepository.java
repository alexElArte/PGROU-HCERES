package org.centrale.hceres.repository;

import org.centrale.hceres.items.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformRepository extends JpaRepository<Platform, Integer> {
}
