package org.woelker.jimix.vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.woelker.jimix.core.HttpRequest;
import org.woelker.jimix.core.JimixRequestHandler;
import org.woelker.jimix.core.RequestHandler;

public class JimixVertxHandler implements Handler<HttpServerRequest> {

    RequestHandler requestHandler = new JimixRequestHandler();

    @Override
    public void handle(HttpServerRequest request) {
        try {
            requestHandler.handle(new VertxHttpRequestWrapper(request));
            request.response().end();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
