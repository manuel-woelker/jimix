package org.woelker.jimix.core;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class AssetRequestHandler implements RequestHandler {

    Map<String, String> mimeTypeMap = new HashMap<String, String>();

    {
        mimeTypeMap.put("html", "text/html");
        mimeTypeMap.put("css", "text/css");
        mimeTypeMap.put("js", "application/javascript");
    }

    @Override
    public void handle(HttpRequest httpRequest) throws Exception {
        String path = httpRequest.getPathInfo();
        if ("/".equals(path)) {
            path = "/index.html";
        }
        final InputStream inputStream = AssetRequestHandler.class.getResourceAsStream("../ui/assets" + path);
        if (inputStream == null) {
            httpRequest.sendError(HttpRequest.STATUS_NOT_FOUND);
            return;
        }
        try {
            final int lastDotIndex = path.lastIndexOf(".");
            final String extension = path.substring(lastDotIndex + 1);
            String mimeType = mimeTypeMap.get(extension);
            if (mimeType == null) {
                mimeType = "text/plain";
            }
            httpRequest.setContentType(mimeType);
            JimixIOUtils.copy(inputStream, httpRequest.getOutputStream());
        } finally {
            inputStream.close();
        }
    }

}
