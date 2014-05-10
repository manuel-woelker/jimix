package org.woelker.jimix.vertx;

import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.HttpServerResponse;
import org.woelker.jimix.core.HttpRequest;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

class VertxHttpRequestWrapper implements HttpRequest {

    private final HttpServerRequest request;
    private final HttpServerResponse response;
    private Map<String, Object> attributes = new HashMap<String, Object>();

    public VertxHttpRequestWrapper(HttpServerRequest request) {
        this.request = request;
        this.response = request.response();
    }

    @Override
    public String getMethod() {
        return request.method();
    }

    @Override
    public String getPathInfo() {
        try {
            return urlDecode(request.params().get("param0"));
        } catch (URISyntaxException e) {
            return request.params().get("param0");
        }
    }

    @Override
    public String getQueryString() {
        return request.query();
    }
    
    

    private String urlDecode(String url) throws URISyntaxException {
        return new URI(url).getPath();
    }

    @Override
    public String getRequestURI() {
        return request.uri();
    }

    @Override
    public void setContentType(String contentType) {
        request.response().putHeader("Content-Type", contentType);
    }

    @Override
    public OutputStream getOutputStream() throws IOException {
        response.setChunked(true);
        return new OutputStream() {
            @Override
            public void write(int b) throws IOException {
                Buffer buffer = new Buffer(1);
                buffer.appendByte((byte) b);
                response.write(buffer);
            }

            @Override
            public void write(byte[] b, int off, int len) throws IOException {
                Buffer buffer = new Buffer(len);
                buffer.appendBytes(b, off, len);
                response.write(buffer);
            }
        };
    }

    @Override
    public void sendError(int errorStatus) throws IOException {
        response.setStatusCode(errorStatus);
    }

    @Override
    public void setStatus(int status) throws IOException {
        response.setStatusCode(status);
    }
    
    @Override
    public void sendRedirect(String url) throws IOException {
        response.putHeader("Location", url);
        response.setStatusCode(301);
    }

    @Override
    public void setAttribute(String key, Object attribute) {
        attributes.put(key, attribute);

    }

    @Override
    public Object getAttribute(String key) {
        return attributes.get(key);
    }

    @Override
    public void setHeader(String header, String value) {
        response.putHeader(header, value);
    }

}
