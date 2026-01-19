package org.centrale.hceres.service.csv.util;

import java.util.List;

public interface RepoSaveAllEntities<T> {
    List<T> saveAll(Iterable<T> entities);
}
