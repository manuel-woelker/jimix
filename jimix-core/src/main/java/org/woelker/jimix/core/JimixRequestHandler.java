package org.woelker.jimix.core;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JimixRequestHandler implements RequestHandler {

    public static class DispatchEntry {

        Pattern pattern;
        RequestHandler handler;

        public DispatchEntry(Pattern pattern, RequestHandler handler) {
            this.pattern = pattern;
            this.handler = handler;
        }

    }
    ArrayList<DispatchEntry> dispatchList = new ArrayList<DispatchEntry>();

    public JimixRequestHandler() {
        addDispatch("/api/inventory", new InventoryRequestHandler());
        addDispatch("/api/mbeans/([^/]+)", new MbeanRequestHandler());
        addDispatch(".*", new AssetRequestHandler());
    }

    @Override
    public void handle(HttpRequest httpRequest) throws Exception {
        httpRequest.setHeader("Access-Control-Allow-Origin", "*");
        if (httpRequest.getPathInfo() == null) {
            httpRequest.sendRedirect(httpRequest.getRequestURI() + "/");
            return;
        }
        String path = httpRequest.getPathInfo();
        for (DispatchEntry dispatchEntry : dispatchList) {
            final Matcher matcher = dispatchEntry.pattern.matcher(path);
            if (matcher.matches()) {
                for (int i = 0; i < matcher.groupCount(); i++) {
                    httpRequest.setAttribute("param-" + i, matcher.group(i + 1));
                }
                dispatchEntry.handler.handle(httpRequest);
                return;
            }
        }
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private void addDispatch(String regex, RequestHandler handler) {
        dispatchList.add(new DispatchEntry(Pattern.compile("^" + regex + "$"), handler));
    }

}
