package org.centrale.hceres.dto.csv.utils;

import org.centrale.hceres.dto.csv.utils.SupportedCsvTemplate;
import org.centrale.hceres.util.RequestParseException;

import java.util.ArrayList;
import java.util.List;

public class CsvParserUtil {

    private CsvParserUtil() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * This method encapsulates a {@link CsvParseFieldCallBack#parse} method call and catches any
     * {@link RequestParseException} thrown by the callback method. If a {@link RequestParseException} is caught,
     * it is wrapped in a {@link CsvParseFieldException} and re-thrown.
     *
     * @param fieldNumber The field number being parsed when the exception occurred.
     * @param callBack    The {@link CsvParseFieldCallBack} object that contains the parse method to call.
     * @throws CsvParseFieldException If a {@link RequestParseException} is thrown by the callback method,
     *                           it will be caught and wrapped in a {@link CsvParseFieldException}.
     */
    public static void wrapCsvParseException(int fieldNumber, CsvParseFieldCallBack callBack) throws CsvParseFieldException {
        try {
            callBack.parse(fieldNumber);
        } catch (RequestParseException | IndexOutOfBoundsException e) {
            throw new CsvParseFieldException(e, fieldNumber);
        }
    }

    /**
     * Checks that the given dependency is not null. If the dependency is null,
     * a {@link CsvDependencyFieldException} is thrown indicating that the dependency with the given ID was not found.
     * If the dependency is not null, the given {@link CsvSetDependencyCallBack#setDependency} method is called.
     *
     * @param <T>                   The type of the dependency object.
     * @param fieldNumber           The field number being parsed when the exception occurred.
     * @param fieldValue            The value of the field being parsed.
     * @param supportedCsvTemplate  The {@link SupportedCsvTemplate} that corresponds to the dependency being set.
     * @param dependency            The dependency object to set.
     * @param callBack              The {@link CsvSetDependencyCallBack} object that contains the setDependency method to call.
     * @throws CsvDependencyFieldException If the given dependency is null, a {@link CsvDependencyFieldException} is thrown indicating
     *                                that the dependency with the given ID was not found.
     */
    public static <T> void wrapCsvDependencyException(int fieldNumber,
                                                      Integer fieldValue,
                                                      SupportedCsvTemplate supportedCsvTemplate,
                                                      T dependency,
                                                      CsvSetDependencyCallBack<T> callBack)
            throws CsvDependencyFieldException {
        if (fieldValue == null) {
            // it means that field already thrown parse exception and is not defined
            return;
        }
        if (dependency == null) {
            throw new CsvDependencyFieldException(
                    "Dependency " + supportedCsvTemplate + " having id " + fieldValue + " not found",
                    fieldNumber,
                    supportedCsvTemplate
            );
        }
        callBack.setDependency(dependency);
    }


    /**
     * Calls the {@link CsvGenericCallBack#call} method for each provided {@link CsvGenericCallBack} object, catching any
     * {@link CsvFieldException}s or {@link CsvAllFieldExceptions} thrown and adding them to a list of exceptions. If any
     * exceptions are caught, a new {@link CsvAllFieldExceptions} object is thrown containing the list of exceptions.
     *
     * @param callBacks The array of {@link CsvGenericCallBack} objects to call.
     * @throws CsvAllFieldExceptions If one or more {@link CsvFieldException}s or {@link CsvAllFieldExceptions} are caught
     *                               during the execution of the provided callbacks, a new {@link CsvAllFieldExceptions}
     *                               object is thrown containing the list of exceptions.
     */
    public static void wrapCsvAllFieldExceptions(CsvGenericCallBack... callBacks) throws CsvAllFieldExceptions {
        List<CsvFieldException> exceptions = new ArrayList<>();
        for (CsvGenericCallBack callBack : callBacks) {
            try {
                callBack.call();
            } catch (CsvFieldException e) {
                exceptions.add(e);
            }
        }
        if (!exceptions.isEmpty()) {
            throw new CsvAllFieldExceptions(exceptions);
        }
    }
}
