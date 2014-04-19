package org.woelker.jimix.core.logging;

class Slf4jLogger implements Logger {

    protected final org.slf4j.Logger delegate;

    Slf4jLogger(Class clazz) {
        delegate = org.slf4j.LoggerFactory.getLogger(clazz);
    }

    @Override
    public void info(String logMessage) {
        delegate.info(logMessage);
    }

    @Override
    public void debug(String logMessage) {
        delegate.debug(logMessage);
    }

    @Override
    public void warn(String logMessage) {
        delegate.warn(logMessage);
    }

    @Override
    public void warn(String logMessage, Throwable throwable) {
        delegate.warn(logMessage, throwable);
    }

    @Override
    public void error(String logMessage) {
        delegate.error(logMessage);
    }

    @Override
    public void error(String logMessage, Throwable throwable) {
        delegate.error(logMessage, throwable);
    }

}
