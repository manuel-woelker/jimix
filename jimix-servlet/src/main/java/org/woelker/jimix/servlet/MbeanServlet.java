package org.woelker.jimix.servlet;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import javax.management.MBeanAttributeInfo;
import javax.management.MBeanInfo;
import javax.management.MBeanServer;
import javax.management.ObjectInstance;
import javax.management.ObjectName;
import javax.management.RuntimeMBeanException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MbeanServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();

        final String objectName = (String) req.getAttribute("param-0");
        try {
            Set<ObjectInstance> instances = mbeanServer.queryMBeans(new ObjectName(objectName), null);
            if (instances.isEmpty()) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                return;
            }
            Map<String, Object> result = new HashMap<String, Object>();
            ObjectInstance instance = instances.iterator().next();
            MBeanInfo mBeanInfo = mbeanServer.getMBeanInfo(instance.getObjectName());
            final ArrayList<Object> attributes = new ArrayList<Object>();
            result.put("attributes", attributes);
            for (MBeanAttributeInfo attributeInfo : mBeanInfo.getAttributes()) {
                final HashMap<String, Object> attribute = new HashMap<String, Object>();
                attribute.put("name", attributeInfo.getName());
                attribute.put("type", attributeInfo.getType());
                attribute.put("description", attributeInfo.getDescription());
                try {
                    attribute.put("value", mbeanServer.getAttribute(instance.getObjectName(), attributeInfo.getName()));
                } catch (RuntimeMBeanException ignored) {
                    attribute.put("value", null);
                }
                attributes.add(attribute);
            }

            new JsonWriter(resp.getOutputStream()).serialize(result);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

}
