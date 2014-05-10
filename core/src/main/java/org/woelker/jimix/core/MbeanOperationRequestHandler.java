package org.woelker.jimix.core;

import javax.management.*;
import java.lang.management.ManagementFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MbeanOperationRequestHandler implements RequestHandler {
    MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();

    @Override
    public void handle(HttpRequest httpRequest) throws Exception {
        final String objectName = (String) httpRequest.getAttribute("param-0");
        final String operationName = (String) httpRequest.getAttribute("param-1");
        Set<ObjectInstance> instances = mbeanServer.queryMBeans(new ObjectName(objectName), null);
        if (instances.isEmpty()) {
            httpRequest.sendError(HttpRequest.STATUS_NOT_FOUND);
            return;
        }
        Map<String, Object> result = new HashMap<String, Object>();
        ObjectInstance instance = instances.iterator().next();
        MBeanInfo mBeanInfo = mbeanServer.getMBeanInfo(instance.getObjectName());
        Object invocationResult = mbeanServer.invoke(instance.getObjectName(), operationName, new Object[0], new String[0]);            
        result.put("result", invocationResult);
        new JsonWriter(httpRequest.getOutputStream()).serialize(result);
    }

}
