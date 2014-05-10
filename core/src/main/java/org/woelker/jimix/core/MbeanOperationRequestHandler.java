package org.woelker.jimix.core;

import java.lang.management.ManagementFactory;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.management.*;

public class MbeanOperationRequestHandler implements RequestHandler {

    MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();

    TypeCoercer typeCoercer = new TypeCoercer();
    
    @Override
    public void handle(HttpRequest httpRequest) throws Exception {
        final String objectName = (String) httpRequest.getAttribute("param-0");
        final String operationName = (String) httpRequest.getAttribute("param-1");
        List<String> arguments = new ArrayList<String>();

        final String queryString = httpRequest.getQueryString();
        if (queryString != null) {
            String[] pairs = queryString.split("&");
            for (String pair : pairs) {
                int idx = pair.indexOf("=");
                final String name = URLDecoder.decode(pair.substring(0, idx), "UTF-8");
                final String value = URLDecoder.decode(pair.substring(idx + 1), "UTF-8");
                if ("argument".equals(name)) {
                    arguments.add(value);
                }

            }
        }
        Set<ObjectInstance> instances = mbeanServer.queryMBeans(new ObjectName(objectName), null);
        if (instances.isEmpty()) {
            httpRequest.sendError(HttpRequest.STATUS_NOT_FOUND);
            return;
        }
        Map<String, Object> result = new HashMap<String, Object>();
        ObjectInstance instance = instances.iterator().next();
        MBeanInfo mBeanInfo = mbeanServer.getMBeanInfo(instance.getObjectName());
        String[] signature = new String[0];
        for (MBeanOperationInfo operation : mBeanInfo.getOperations()) {
            if (arguments.size() == operation.getSignature().length) {
                List<String> parameters = new ArrayList<String>();
                for (MBeanParameterInfo parameter : operation.getSignature()) {
                    parameters.add(parameter.getType());
                }
                signature = parameters.toArray(signature);
                break;
            }
        }
        Object[] argumentArray = new Object[signature.length];
        for(int i = 0; i < signature.length; i++) {
            final Object value = typeCoercer.coerce(arguments.get(i), signature[i]);
            argumentArray[i] = value;
        }
        Object invocationResult = mbeanServer.invoke(instance.getObjectName(), operationName, argumentArray, signature);
        result.put("result", invocationResult);
        new JsonWriter(httpRequest.getOutputStream()).serialize(result);
    }

}
