package org.woelker.jimix.servlet;

import com.yammer.metrics.Metrics;
import com.yammer.metrics.core.Gauge;
import com.yammer.metrics.core.MetricName;
import java.util.concurrent.TimeUnit;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;

public class JimixServletIntegrationTest {

    private Server server;
    private WebDriver driver;
    final MetricName metricName = new MetricName("fizz", "buzz", "foo");

    @Before
    public void before() throws Exception {
        final Gauge<Long> gauge = Metrics.newGauge(metricName, new Gauge<Long>() {
            long current = 42;

            @Override
            public Long value() {
                return current;
            }
        });

        server = new Server(8081);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        context.addServlet(new ServletHolder(new JimixServlet()), "/jimix/*");
        server.start();        
//        driver = new FirefoxDriver();
        driver = new PhantomJSDriver();
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    }

    @After
    public void after() throws Exception {
        Metrics.defaultRegistry().removeMetric(metricName);

        server.stop();
        driver.close();
    }

    @Test
    @Ignore("Disabled while react UI is being developed")
    public void basicTest() throws Exception {
        driver.get("http://localhost:8081/jimix/");
        final WebElement element = driver.findElement(By.linkText("buzz - foo"));
        element.click();
        driver.findElement(By.xpath("//*[text()='Value']"));
        final WebElement value = driver.findElement(By.xpath("//*[text()='42']"));
    }

}
