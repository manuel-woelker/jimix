package org.woelker.jimix.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.woelker.jimix.core.JimixRequestHandler;

public class JimixServlet extends HttpServlet {

    private final JimixRequestHandler jimixRequestHandler;

    public JimixServlet() {
        jimixRequestHandler = new JimixRequestHandler();
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            jimixRequestHandler.handle(new ServletHttpRequestWrapper(request, response));
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

}
