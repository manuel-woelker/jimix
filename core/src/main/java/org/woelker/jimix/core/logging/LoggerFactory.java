package org.woelker.jimix.core.logging;

public class LoggerFactory {

    static boolean hasSlf4j = false;

    static {
        try {
            final Class<?> clazz = LoggerFactory.class.getClassLoader().loadClass("org.slf4j.Logger");
            if (clazz != null) {
                hasSlf4j = true;
            }
        } catch (Throwable ignored) {

        }

    }

    public static Logger createLogger(Class clazz) {
        if (hasSlf4j) {
            return new Slf4jLogger(clazz);
        } else {
            return new JuliLogger(clazz);
        }
    }
}
