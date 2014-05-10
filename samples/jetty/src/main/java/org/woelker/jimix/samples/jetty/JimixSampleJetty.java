package org.woelker.jimix.samples.jetty;

import com.yammer.metrics.Metrics;
import com.yammer.metrics.core.Gauge;
import com.yammer.metrics.core.MetricName;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.woelker.jimix.servlet.JimixServlet;

import javax.management.*;
import java.lang.management.ManagementFactory;
import java.util.Arrays;

public class JimixSampleJetty {

    public static void main(String[] args) throws Exception {
        new JimixSampleJetty().run();
    }

    private void run() throws Exception {
        addSampleMetrics();
        ManagementFactory.getPlatformMBeanServer().registerMBean(new Hello(), new ObjectName("asdf:type=bar"));

        Server server = new Server(8080);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        context.addServlet(new ServletHolder(new JimixServlet()), "/jimix/*");
        server.start();
        server.join();


    }


    public static class Hello implements HelloMBean {

        private String message = "Hello World";

        @Override
        public String getMessage() {
            return this.message;
        }

        @Override
        public void sayHello() {
            System.out.println(message);
        }

        @Override
        public String createGreeting() {
            System.out.println("Creating greeting");
            return this.message;
        }

        @Override
        public void alwaysFails() {
            throw new RuntimeException("always broken");
        }

        @Override
        public String takes3seconds() throws InterruptedException {
            Thread.sleep(3000);
            return this.message;
        }

        @Override
        public void setMessage(String message) {
            this.message = message;
        }

    }

    public static interface HelloMBean {

        // operations

        public void sayHello();
        public String createGreeting();
        public void alwaysFails();
        public String takes3seconds() throws InterruptedException;

        // attributes

        // a read-write attribute called Message of type String
        public String getMessage();
        public void setMessage(String message);

    }

    private void addSampleMetrics() {
        Metrics.newGauge(JimixSampleJetty.class, "foo", new Gauge<Long>() {
            long current = 0;

            @Override
            public Long value() {
                return current++;
            }
        });
        Metrics.newGauge(JimixSampleJetty.class, "foo", "bar", new Gauge<Long>() {
            long current = 0;

            @Override
            public Long value() {
                return current++;
            }
        });
        final MetricName metricName = new MetricName("fizzfizzfizzfizzfizzfizzfizzfizz fizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizz fizzfizzfizzfizzfizzfizzfizzfizz", "buzz", "foofoofoofoofoofoofoofoofoofoofoo foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoo foofoofoofoofoofoo");
        Metrics.newGauge(metricName, new Gauge<Long>() {
            long current = 0;

            @Override
            public Long value() {
                return current++;
            }
        });
        final MetricName metricNameString = new MetricName("fizz", "buzz", "foo");
        Metrics.newGauge(metricNameString, new Gauge<String>() {
            @Override
            public String value() {
                return "fizzfizzfizzfizzfizzfizzfizzfizz fizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizz fizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizz fizzfizzfizzfizzfizzfizzfizzfizz fizzfizzfizzfizzfizzfizzfizzfizz";
            }
        });
        final MetricName metricNameArray = new MetricName("fizz", "buzz", "array");
        Metrics.newGauge(metricNameArray, new Gauge<String[]>() {
            @Override
            public String[] value() {
                return Arrays.asList("fizzfizzfizzfizzfizzfizzfizzfizz", "fizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizz", "fizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizzfizz", "fizzfizzfizzfizzfizzfizzfizzfizz", "fizzfizzfizzfizzfizzfizzfizzfizz").toArray(new String[0]);
            }
        });
    }

}