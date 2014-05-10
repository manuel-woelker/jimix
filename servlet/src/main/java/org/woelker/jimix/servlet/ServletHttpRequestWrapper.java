package org.woelker.jimix.servlet;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.woelker.jimix.core.HttpRequest;

class ServletHttpRequestWrapper implements HttpRequest {

    private final HttpServletRequest request;
    private final HttpServletResponse response;

    public ServletHttpRequestWrapper(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    @Override
    public String getMethod() {
        return request.getMethod();
    }

    @Override
    public String getPathInfo() {
        return request.getPathInfo();
    }

    @Override
    public String getRequestURI() {
        return request.getRequestURI();
    }

    @Override
    public void setContentType(String contentType) {
        response.setContentType(contentType);
    }

    @Override
    public OutputStream getOutputStream() throws IOException {
        return response.getOutputStream();
    }

    @Override
    public void sendError(int errorStatus) throws IOException {
        response.sendError(errorStatus);
    }

    @Override
    public void setStatus(int status) {
        response.setStatus(status);
    }

    @Override
    public void sendRedirect(String url) throws IOException {
        response.sendRedirect(url);
    }

    @Override
    public void setAttribute(String key, Object attribute) {
        request.setAttribute(key, attribute);

    }

    @Override
    public Object getAttribute(String key) {
        return request.getAttribute(key);
    }

    @Override
    public void setHeader(String header, String value) {
        response.setHeader(header, value);
    }

}
