package org.woelker.jimix.core.logging;

import java.util.logging.Level;

class JuliLogger implements Logger {

    protected final java.util.logging.Logger delegate;

    JuliLogger(Class clazz) {
        delegate = java.util.logging.Logger.getLogger(clazz.getName());
    }

    @Override
    public void info(String logMessage) {
        log(Level.INFO, logMessage);
    }

    @Override
    public void debug(String logMessage) {
        log(Level.FINE, logMessage);
    }

    @Override
    public void warn(String logMessage) {
        log(Level.WARNING, logMessage);
    }

    @Override
    public void warn(String logMessage, Throwable throwable) {
        log(Level.WARNING, logMessage, throwable);
    }

    @Override
    public void error(String logMessage) {
        log(Level.SEVERE, logMessage);
    }

    @Override
    public void error(String logMessage, Throwable throwable) {
        log(Level.SEVERE, logMessage, throwable);
    }

    private void log(Level level, String logMessage, Throwable throwable) {
        if (delegate.isLoggable(level)) {
            final StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
            final StackTraceElement element = stackTrace[METHODNAME_DEPTH];
            final String methodName = element.getMethodName();
            final String className = element.getClassName();
            delegate.logp(level, className, methodName, logMessage, throwable);
        }
    }

    private void log(Level level, String logMessage) {
        if (delegate.isLoggable(level)) {
            final StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
            final StackTraceElement element = stackTrace[METHODNAME_DEPTH];
            final String methodName = element.getMethodName();
            final String className = element.getClassName();
            delegate.logp(level, className, methodName, logMessage);
        }
    }
    private static final int METHODNAME_DEPTH = 3;

}
