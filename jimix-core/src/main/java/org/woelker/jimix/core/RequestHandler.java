package org.woelker.jimix.core;

public interface RequestHandler {

    public void handle(HttpRequest httpRequest) throws Exception;

}
