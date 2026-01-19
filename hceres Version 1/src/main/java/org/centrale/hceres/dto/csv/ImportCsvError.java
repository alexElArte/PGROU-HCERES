package org.centrale.hceres.dto.csv;

import lombok.Data;
import org.centrale.hceres.dto.csv.utils.CsvDependencyFieldException;
import org.centrale.hceres.dto.csv.utils.CsvFieldException;
import org.centrale.hceres.dto.csv.utils.CsvGenericCallBack;
import org.centrale.hceres.dto.csv.utils.CsvParseFieldException;
import org.centrale.hceres.util.RequestParseException;

import java.io.Serializable;

/**
 * The class is sent to the front-end and will be displayed in same table of papa parse errors.
 * Papaparse errors documentation:
 * <a href="https://www.papaparse.com/docs#errors">https://www.papaparse.com/docs#errors</a>
 */
@Data
public class ImportCsvError implements Serializable {

    /**
     * Generic error type group, it can be the class name of thrown exception:
     * <ul>
     *     <li>
     *         **CsvParseFieldException** which refer to {@link org.centrale.hceres.dto.csv.utils.CsvParseFieldException}
     *     </li>
     *     <li>
     *         **CsvDependencyFieldException** which refer to {@link org.centrale.hceres.dto.csv.utils.CsvDependencyFieldException}
     *     </li>
     * </ul>
     */
    private String type;

    /**
     * More specific error type, it can be the class name of cause present in exception:
     * <ul>
     *     <li>
     *         **NumberFormatException** which refer to {@link java.lang.NumberFormatException}
     *         </li>
     *         ....
     *  </ul>
     *  In case of Dependency exception, the code will be the name of the dependency:
     *  <ul>
     *      <li>
     *          **ACTIVITY** which refer to {@link org.centrale.hceres.service.csv.util.SupportedCsvTemplate#ACTIVITY}
     *      </li>
     *      ....
     * </ul>
     */
    private String code;

    /**
     * The message of the exception
     */
    private String message;

    /**
     * The line number in the csv file where the error occurred
     */
    private int row;

    /**
     * The field number specifying the column in the csv file where the error occurred
     */
    private int fieldNumber;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getFieldNumber() {
        return fieldNumber;
    }

    public void setFieldNumber(int fieldNumber) {
        this.fieldNumber = fieldNumber;
    }
    
    

    public ImportCsvError(CsvFieldException e, int row) {
        this.type = e.getClass().getSimpleName();
        this.row = row;
        this.fieldNumber = e.getFieldNumber();
        fillCodeFromException(e);
        fillMessageFromException(e);
    }

    public void fillCodeFromException(CsvFieldException e)  {
        if (e instanceof CsvDependencyFieldException) {
            this.code = ((CsvDependencyFieldException) e).getDependency().toString();
        } else if (e.getCause() != null) {
            Throwable cause = e.getCause();
            while (cause.getCause() != null) {
                cause = cause.getCause();
            }
            this.code = cause.getClass().getSimpleName();
        } else {
            this.code = e.getClass().getSimpleName();
        }
    }

    public void fillMessageFromException(CsvFieldException e) {
        String message = e.getMessage();
        // clean Request parser class name
        int index = message.indexOf(RequestParseException.class.getName());
        if (index != -1) {
            message = message.substring(index + RequestParseException.class.getName().length() + 2);
        }
        this.message = message;
    }
}
