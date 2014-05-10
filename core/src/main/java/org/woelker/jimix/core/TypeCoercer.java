package org.woelker.jimix.core;

import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;

class TypeCoercer {
    static Map<String, Class<?>> primitiveTypeMap = new HashMap<String, Class<?>>();
    static {
        primitiveTypeMap.put("byte", Byte.class);
        primitiveTypeMap.put("short", short.class);
        primitiveTypeMap.put("char", Character.class);
        primitiveTypeMap.put("int", Integer.class);
        primitiveTypeMap.put("long", Long.class);
        primitiveTypeMap.put("float", Float.class);
        primitiveTypeMap.put("double", Double.class);
        primitiveTypeMap.put("boolean", Boolean.class);
    }

    Object coerce(String string, Class<?> cls) {
        try {
            if(cls == String.class) {
                return string;
            }
            final Constructor<?> stringConstructor = cls.getConstructor(String.class);
            if(stringConstructor != null) {
                return stringConstructor.newInstance(string);
            }
            throw new RuntimeException("Unable to coerce '"+string+"' to class "+cls.getName());
        } catch (Exception ex) {
           throw new RuntimeException("Unable to coerce '"+string+"' to class "+cls.getName(), ex);
        }
    }

    Object coerce(String input, String className) {
        Class<?> cls = classForName(className);
        return coerce(input, cls);
    }

    private Class<?> classForName(String className) {
        try {
            Class<?> cls = primitiveTypeMap.get(className);
            if(cls != null) {
                return cls;
            }
            return Class.forName(className);
        } catch (ClassNotFoundException ex) {
            throw new RuntimeException(ex);
        }
    }

}
