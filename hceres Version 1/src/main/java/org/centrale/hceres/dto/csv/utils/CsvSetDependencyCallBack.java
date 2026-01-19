package org.centrale.hceres.dto.csv.utils;

import org.centrale.hceres.util.RequestParseException;

public interface CsvSetDependencyCallBack<T> {
    void setDependency(T dependency);
}
