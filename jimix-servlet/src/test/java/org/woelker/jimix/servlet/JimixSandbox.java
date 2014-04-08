package org.woelker.jimix.servlet;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class JimixSandbox {

    public static void main(String[] args) throws Exception {
        new JimixSandbox().run();
    }

    private void run() throws Exception {
        Server server = new Server(8080);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        context.addServlet(new ServletHolder(new JimixServlet()), "/jimix/*");
        server.start();
        server.join();
    }

}
