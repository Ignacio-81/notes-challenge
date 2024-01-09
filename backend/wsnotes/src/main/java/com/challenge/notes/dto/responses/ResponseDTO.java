package com.challenge.notes.dto.responses;

import org.springframework.http.HttpStatus;
/**
 * DTO to manage Response
 *
 */
public class ResponseDTO {
    private int status;
    private String message;
    private Object body;

    public ResponseDTO() {
    }

    public ResponseDTO(int code, String message) {
        this.status = code;
        this.message = message;
    }

    public ResponseDTO(int code, String message, Object body) {
        this.status = code;
        this.message = message;
        this.body = body;
    }

    /**
     * method to return when result is ok
     * @param httpStatus http code to send
     * @param body body to send
     * @return status , message , and body
     */
    public static ResponseDTO general(HttpStatus httpStatus, Object body) {
        return new ResponseDTO(httpStatus.value(), httpStatus.getReasonPhrase(), body);
    }

    /**
     * methed to use when answering errors
     * @param httpStatus http code to send
     * @param message message to send
     * @return status, message and body
     */
    public static ResponseDTO custom(HttpStatus httpStatus, String message) {
        return new ResponseDTO(httpStatus.value(), message, null);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getBody() {
        return body;
    }

    public void setBody(Object body) {
        this.body = body;
    }
}
