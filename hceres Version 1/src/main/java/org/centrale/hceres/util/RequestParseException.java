package org.centrale.hceres.util;

public class RequestParseException extends Exception {

        public RequestParseException(String message) {
            super(message);
        }

        public RequestParseException(String message, Throwable cause) {
            super(message, cause);
        }

        public RequestParseException(Throwable cause) {
            super(cause);
        }

        public RequestParseException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
            super(message, cause, enableSuppression, writableStackTrace);
        }
}
