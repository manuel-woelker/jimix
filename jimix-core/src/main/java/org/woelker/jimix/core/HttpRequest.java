package org.woelker.jimix.core;

import java.io.IOException;
import java.io.OutputStream;

public interface HttpRequest {

    public static int STATUS_NOT_FOUND = 404;

    public String getPathInfo();

    public String getRequestURI();

    public void setContentType(String contentType);

    public OutputStream getOutputStream() throws IOException;

    public void sendError(int errorStatus) throws IOException;

    public void sendRedirect(String url) throws IOException;

    public void setAttribute(String key, Object attribute);

    public Object getAttribute(String key);

}
