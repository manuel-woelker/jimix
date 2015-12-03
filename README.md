# jimix

[![Build Status](https://travis-ci.org/manuel-woelker/jimix.svg)](https://travis-ci.org/manuel-woelker/jimix)

A modern JMX web console

## Features

 * Zero third-party dependencies
 * Basic Web UI
 * Simple REST interface (CORS enabled)
 * Auto-refresh with display of value deltas
 * Invoking operations and setting attributes
 
## Screenshot

![screenshot](https://raw.github.com/manuel-woelker/jimix/screenshots/screenshot.png)

## Changelog

##### 1.2.1 (2014-08-19)
 * (fix) core/ui: properly map NaN and infinity values to null in JSON

##### 1.2.0 (2014-05-11)
 * Initial public release

## Planned features
 
 * Adapters for all major web frameworks
 * Authentication
 
## Usage

Refer to the samples directory for detailed usage examples.

### Standalone WAR

Download [the standalone WAR file ](https://search.maven.org/remote_content?g=org.woelker.jimix.war&a=jimix&v=LATEST&e=war) and drop it inside your application server.

### WAR

Maven

```
<dependency>
    <groupId>org.woelker.jimix</groupId>
    <artifactId>jimix-servlet</artifactId>
    <version>2.1.1</version>
</dependency>
```

web.xml

```
<servlet>
    <servlet-name>jimix</servlet-name>
    <servlet-class>org.woelker.jimix.servlet.JimixServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>jimix</servlet-name>
    <url-pattern>/jimix/*</url-pattern>
</servlet-mapping>
```

### servlet (Spring Boot)

Maven


```
<dependency>
    <groupId>org.woelker.jimix</groupId>
    <artifactId>jimix-servlet</artifactId>
    <version>2.1.1</version>
</dependency>
```

Spring Boot Application

```
@Bean
public ServletRegistrationBean jimixServletRegistration() {
  ServletRegistrationBean registration = new ServletRegistrationBean(new JimixServlet());
		registration.setUrlMappings(Collections.singletonList("/jimix/*"));
		return registration;
}
```

### servlet (jetty)

Maven


```
<dependency>
    <groupId>org.woelker.jimix</groupId>
    <artifactId>jimix-servlet</artifactId>
    <version>2.1.1</version>
</dependency>
```

Jetty

```
Server server = new Server(8080);
ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
context.setContextPath("/");
server.setHandler(context);

context.addServlet(new ServletHolder(new JimixServlet()), "/jimix/*");
server.start();
server.join();
```

### Dropwizard

Maven


```
<dependency>
    <groupId>org.woelker.jimix</groupId>
    <artifactId>jimix-dropwizard</artifactId>
    <version>2.1.1</version>
</dependency>
```

Dropwizard

```
@Override
public void initialize(Bootstrap<Configuration> bootstrap) {
    bootstrap.addBundle(new JimixBundle());
}
```

### Vert.x

Maven


```
<dependency>
    <groupId>org.woelker.jimix</groupId>
    <artifactId>jimix-vertx</artifactId>
    <version>2.1.1</version>
</dependency>
```

Vert.x

```
Vertx vertx = new DefaultVertx();
HttpServer server = vertx.createHttpServer();

RouteMatcher routeMatcher = new RouteMatcher();

routeMatcher.allWithRegEx("/jimix(.*)", new JimixVertxHandler());

server.requestHandler(routeMatcher).listen(8080, "localhost");
```






