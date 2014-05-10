package org.woelker.jimix.samples.vertx;

import org.vertx.java.core.Vertx;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.impl.DefaultVertx;
import org.woelker.jimix.vertx.JimixVertxHandler;

public class JimixSampleVertxMain {
    public static void main(String[] args) throws Exception {
        new JimixSampleVertxMain().run();
    }

    private void run() throws Exception {
        Vertx vertx = new DefaultVertx();
        HttpServer server = vertx.createHttpServer();

        RouteMatcher routeMatcher = new RouteMatcher();

        routeMatcher.allWithRegEx("/jimix(.*)", new JimixVertxHandler());

        server.requestHandler(routeMatcher).listen(8080, "localhost");
        while (true) {
            Thread.sleep(10000);
        }
    }

}
