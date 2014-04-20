package org.woelker.jimix.samples.vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.platform.Verticle;

public class JimixSampleVertx extends Verticle {

    public void start() {
        HttpServer server = vertx.createHttpServer();

        RouteMatcher routeMatcher = new RouteMatcher();

        routeMatcher.get("/jimix", new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                req.response().end("You requested dogs");
            }
        });
        routeMatcher.get("/animals/cats", new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                req.response().end("You requested cats");
            }
        });

        server.requestHandler(routeMatcher).listen(8080, "localhost");
        container.logger().info("JimixSampleVertx started");

    }
}
