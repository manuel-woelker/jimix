package org.woelker.jimix.core;

import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import javax.management.*;

public class MbeanRequestHandler implements RequestHandler {
    MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();

    @Override
    public void handle(HttpRequest httpRequest) throws Exception {
        final String objectName = (String) httpRequest.getAttribute("param-0");
        Set<ObjectInstance> instances = mbeanServer.queryMBeans(new ObjectName(objectName), null);
        if (instances.isEmpty()) {
            httpRequest.sendError(HttpRequest.STATUS_NOT_FOUND);
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
            attribute.put("writable", attributeInfo.isWritable());
            try {
                attribute.put("value", mbeanServer.getAttribute(instance.getObjectName(), attributeInfo.getName()));
            } catch (RuntimeMBeanException ignored) {
                attribute.put("value", null);
            }
            attributes.add(attribute);
        }
        final ArrayList<Object> operations = new ArrayList<Object>();
        result.put("operations", operations);
        for (MBeanOperationInfo operationInfo : mBeanInfo.getOperations()) {
            final HashMap<String, Object> operation = new HashMap<String, Object>();
            operation.put("name", operationInfo.getName());
            operation.put("returnType", operationInfo.getReturnType());
            operation.put("description", operationInfo.getDescription());
            ArrayList<Object> signature = new ArrayList<Object>();
            operation.put("signature", signature);
            for(MBeanParameterInfo parameterInfo: operationInfo.getSignature()) {
                final HashMap<String, Object> parameter = new HashMap<String, Object>();
                parameter.put("name", parameterInfo.getName());
                parameter.put("type", parameterInfo.getType());
                parameter.put("description", parameterInfo.getDescription());
                signature.add(parameter);
            }
            operations.add(operation);
        }

        new JsonWriter(httpRequest.getOutputStream()).serialize(result);
    }

}
