package org.woelker.jimix.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JimixServlet extends HttpServlet {

    public static class DispatchEntry {

        Pattern pattern;
        HttpServlet servlet;

        public DispatchEntry(Pattern pattern, HttpServlet servlet) {
            this.pattern = pattern;
            this.servlet = servlet;
        }

    }
    ArrayList<DispatchEntry> dispatchList = new ArrayList<DispatchEntry>();

    public JimixServlet() {
        addDispatch("/api/inventory", new InventoryServlet());
        addDispatch("/api/mbeans/([^/]+)", new MbeanServlet());
        addDispatch(".*", new AssetServlet());
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getPathInfo() == null) {
            resp.sendRedirect(req.getRequestURI() + "/");
            return;
        }
        String path = req.getPathInfo();
        for (DispatchEntry dispatchEntry : dispatchList) {
            final Matcher matcher = dispatchEntry.pattern.matcher(path);            
            if (matcher.matches()) {
                for(int i = 0; i < matcher.groupCount(); i++) {
                    req.setAttribute("param-"+i, matcher.group(i+1));
                }
                dispatchEntry.servlet.service(req, resp);
                return;
            }
        }
    }

    private void addDispatch(String regex, HttpServlet servlet) {
        dispatchList.add(new DispatchEntry(Pattern.compile("^" + regex+ "$"), servlet));
    }

}
