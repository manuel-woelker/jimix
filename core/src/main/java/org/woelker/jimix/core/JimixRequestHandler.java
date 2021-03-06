package org.woelker.jimix.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.management.MBeanInfo;
import javax.management.ObjectInstance;
import org.woelker.jimix.core.logging.Logger;
import org.woelker.jimix.core.logging.LoggerFactory;

public class JimixRequestHandler implements RequestHandler {

    private final Logger logger = LoggerFactory.createLogger(JimixRequestHandler.class);

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
        addDispatch("/api/mbeans/([^/]+)/(.+)", new MbeanOperationRequestHandler());
        addDispatch(".*", new AssetRequestHandler());
        logger.info("Created jimix request handler");
    }

    @Override
    public void handle(HttpRequest httpRequest) throws Exception {
        try {
            httpRequest.setHeader("Access-Control-Allow-Origin", "*");
            if (httpRequest.getPathInfo() == null || httpRequest.getPathInfo().length() == 0) {
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
        } catch (Throwable throwable) {
            logger.warn("Error handling request", throwable);
            httpRequest.setStatus(500);
            Map<String, Object> result = new HashMap<String, Object>();
            result.put("message", throwable.getMessage());
            new JsonWriter(httpRequest.getOutputStream()).serialize(result);

        }
    }

    private void addDispatch(String regex, RequestHandler handler) {
        dispatchList.add(new DispatchEntry(Pattern.compile("^" + regex + "$"), handler));
    }

}
