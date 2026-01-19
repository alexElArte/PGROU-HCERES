package org.centrale.hceres.repository;

import org.centrale.hceres.items.MeetingCongressOrg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingCongressOrgRepository extends JpaRepository<MeetingCongressOrg, Integer>{
}
