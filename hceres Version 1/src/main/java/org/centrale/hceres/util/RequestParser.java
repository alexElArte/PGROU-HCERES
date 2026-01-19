package org.centrale.hceres.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class RequestParser {

    /**
     * Maximum length of a string as defined in the database
     */
    public static final int MAX_STRING_LENGTH = 2048;
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    public static final String CSV_DEFAULT_DATE_FORMAT = "dd/MM/yy";

    public static Integer getAsInteger(Object number) throws RequestParseException {
        if (number instanceof Integer)
            return (Integer) number;
        else if (number instanceof String) {
            try {
                return Integer.parseInt((String) number);
            } catch (NumberFormatException e) {
                throw new RequestParseException(e);
            }
        } else throw new RequestParseException("Error while parsing number");
    }

    public static Integer getAsIntegerOrDefault(Object number, Integer defaultValue) {
        try {
            return getAsInteger(number);
        } catch (RequestParseException e) {
            return defaultValue;
        }
    }

    public static List<?> getAsList(Object objectList) {
        List<?> list = null;
        if (objectList.getClass().isArray()) {
            list = Arrays.asList((Object[])objectList);
        } else if (objectList instanceof Collection) {
            list = new ArrayList<>((Collection<?>)objectList);
        }
        return list;
    }

    public static Float getAsFloat(Object number) throws RequestParseException {
        if (number instanceof Float)
            return (Float) number;
        else if (number instanceof String) {
            try {
                return Float.parseFloat((String) number);
            } catch (NumberFormatException e) {
                throw new RequestParseException(e);
            }
        } else throw new RequestParseException("Error while parsing number");
    }

    public static BigDecimal getAsBigDecimal(Object number) throws RequestParseException {
        if (number instanceof BigDecimal)
            return (BigDecimal) number;
        else if (number instanceof String) {
            try {
                return new BigDecimal((String) number);
            } catch (NumberFormatException e) {
                throw new RequestParseException(e);
            }
        } else throw new RequestParseException("Error while parsing number");
    }

    public static BigDecimal getAsBigDecimalOrDefault(Object number, BigDecimal defaultValue) {
        try {
            return getAsBigDecimal(number);
        } catch (RequestParseException e) {
            return defaultValue;
        }
    }

    public static String getAsString(Object string) throws RequestParseException {
        if (string == null)
            throw new RequestParseException(new NullPointerException());
        String returnedValue = String.valueOf(string);
        if (returnedValue.length() > MAX_STRING_LENGTH)
            throw new RequestParseException("String of length #[ " + returnedValue.length() + " ] exceeds maximum length "
                    + MAX_STRING_LENGTH);
        return returnedValue.trim();
    }

    public static java.sql.Date getAsDate(Object date) throws RequestParseException {
        return getAsDate(date, DEFAULT_DATE_FORMAT);
    }
    public static java.sql.Date getAsDateCsvFormat(Object date) throws RequestParseException {
        return getAsDate(date, CSV_DEFAULT_DATE_FORMAT);
    }

    public static java.sql.Date getAsDateCsvFormatOrDefault(Object date, java.sql.Date defaultValue) {
        try {
            return getAsDateCsvFormat(date);
        } catch (RequestParseException e) {
            return defaultValue;
        }
    }

    public static java.sql.Date getAsDate(Object date, String dateFormat) throws RequestParseException {
        Date returnedValue = null;
        // try to convert
        SimpleDateFormat aFormater = new SimpleDateFormat(dateFormat);
        try {
            returnedValue = aFormater.parse(getAsString(date));
        } catch (ParseException e) {
            throw new RequestParseException(e.getMessage() + " Expected format: " + dateFormat, e);
        }
        return new java.sql.Date(returnedValue.getTime());
    }

    public static Boolean getAsBoolean(Object bool) throws RequestParseException {
        if (bool instanceof Boolean)
            return (Boolean) bool;
        else if (bool instanceof String) {
            return Boolean.parseBoolean((String) bool);
        } else throw new RequestParseException("Error while parsing boolean");
    }
}
