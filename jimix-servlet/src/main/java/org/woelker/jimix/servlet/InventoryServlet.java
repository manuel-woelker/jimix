package org.woelker.jimix.servlet;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import javax.management.MBeanAttributeInfo;
import javax.management.MBeanInfo;
import javax.management.MBeanServer;
import javax.management.ObjectInstance;
import javax.management.ObjectName;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InventoryServlet extends HttpServlet {

    private final String userName;
    private String hostName = "<unknownHost>";
    private String mainClass = "<unknown Main Class>";

    public InventoryServlet() {
        userName = System.getProperty("user.name", "<unknownUser>");
        try {
            InetAddress iAddress = InetAddress.getLocalHost();
            hostName = iAddress.getHostName();
            hostName = iAddress.getCanonicalHostName();;

        } catch (Throwable ignored) {

        }
        mainClass = System.getProperty("sun.java.command", "<unknown Main Class>");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();

        Set<ObjectInstance> instances = mbeanServer.queryMBeans(null, null);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("userName", userName);
        result.put("hostName", hostName);
        result.put("mainClass", mainClass);
        final ArrayList<Object> mbeanList = new ArrayList<Object>();
        result.put("mbeans", mbeanList);
        Iterator<ObjectInstance> iterator = instances.iterator();
        resp.setContentType("application/json");
        while (iterator.hasNext()) {
            try {
                ObjectInstance instance = iterator.next();
                final HashMap<String, Object> mbean = new HashMap<String, Object>();
                final ObjectName objectName = instance.getObjectName();
                final MBeanInfo mBeanInfo = mbeanServer.getMBeanInfo(objectName);
                final String description = mBeanInfo.getDescription();
                mbean.put("objectName", objectName.getCanonicalName());
                mbean.put("description", description);
                final ArrayList<Object> attributes = new ArrayList<Object>();
                mbean.put("attributes", attributes);
                mbeanList.add(mbean);
                for (MBeanAttributeInfo attributeInfo : mBeanInfo.getAttributes()) {
                    final HashMap<String, Object> attribute = new HashMap<String, Object>();
                    attribute.put("name", attributeInfo.getName());
                    attribute.put("type", attributeInfo.getType());
                    attribute.put("description", attributeInfo.getDescription());
                    attributes.add(attribute);
                }
            } catch (Throwable throwable) {
                // TODO: how to handle?
            }

        }
        new JsonWriter(resp.getOutputStream()).serialize(result);
    }

}
