package org.woelker.jimix.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JimixServlet extends HttpServlet {

    Map<String, String> mimeTypeMap = new HashMap<String, String>();

    {
        mimeTypeMap.put("html", "text/html");
        mimeTypeMap.put("css", "text/css");
        mimeTypeMap.put("js", "application/javascript");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getPathInfo() == null) {
            resp.sendRedirect(req.getRequestURI() + "/");
            return;
        }
        String path = req.getPathInfo();
        if ("/".equals(path)) {
            path = "/index.html";
        }
        final InputStream inputStream = JimixServlet.class.getResourceAsStream("../ui/assets" + path);
        if (inputStream == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        try {
            final int lastDotIndex = path.lastIndexOf(".");
            final String extension = path.substring(lastDotIndex + 1);
            String mimeType = mimeTypeMap.get(extension);
            if (mimeType == null) {
                mimeType = "text/plain";
            }
            resp.setContentType(mimeType);
            JimixIOUtils.copy(inputStream, resp.getOutputStream());
        } finally {
            inputStream.close();
        }
    }

}
