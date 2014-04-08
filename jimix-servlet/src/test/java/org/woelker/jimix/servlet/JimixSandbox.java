package org.woelker.jimix.servlet;

import java.lang.management.ManagementFactory;
import java.util.Iterator;
import java.util.Set;
import javax.management.MBeanAttributeInfo;
import javax.management.MBeanInfo;
import javax.management.MBeanServer;
import javax.management.ObjectInstance;
import javax.management.ObjectName;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class JimixSandbox {

    public static void main(String[] args) throws Exception {
        new JimixSandbox().run();
    }

    private void run() throws Exception {
        MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();

        Set<ObjectInstance> instances = mbeanServer.queryMBeans(null, null);

        Iterator<ObjectInstance> iterator = instances.iterator();

        while (iterator.hasNext()) {
            ObjectInstance instance = iterator.next();
            System.out.println("---------------------------------------------------------------");
            System.out.println("Object Name: " + instance.getObjectName());
            System.out.println("Class: " + instance.getClass());
            final MBeanInfo mBeanInfo = mbeanServer.getMBeanInfo(instance.getObjectName());
            System.out.println(mBeanInfo.getDescription());
            for (MBeanAttributeInfo attributeInfo : mBeanInfo.getAttributes()) {
                try {
                    System.out.println("\t" + attributeInfo.getName() + " (" + attributeInfo.getType() + ") - " + attributeInfo.getDescription());
                    final Object value = mbeanServer.getAttribute(instance.getObjectName(), attributeInfo.getName());
                    System.out.println("\t\t" + value + " (" + value.getClass() + ")");
                } catch (Throwable throwable) {
                    throwable.printStackTrace();
                }

            }

        }

        Server server = new Server(8080);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        context.addServlet(new ServletHolder(new JimixServlet()), "/jimix/*");
        server.start();
        server.join();
    }

}
