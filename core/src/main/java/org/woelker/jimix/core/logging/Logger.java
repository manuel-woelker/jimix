package org.woelker.jimix.core.logging;

public interface Logger {

    public void info(String logMessage);

    public void debug(String logMessage);

    public void warn(String logMessage);

    public void warn(String logMessage, Throwable throwable);

    public void error(String logMessage);

    public void error(String logMessage, Throwable throwable);
}
