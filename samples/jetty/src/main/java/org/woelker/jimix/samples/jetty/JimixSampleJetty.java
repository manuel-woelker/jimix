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
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JimixSampleJetty {

    public static void main(String[] args) throws Exception {
        new JimixSampleJetty().run();
    }

    private void run() throws Exception {
        addSampleMetrics();
        ManagementFactory.getPlatformMBeanServer().registerMBean(new Hello(), new ObjectName("asdf:name=bar"));
        
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
            System.out.println("message was set to "+message);            
            try {
                Thread.sleep(500);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
            this.message = message;
        }

        @Override
        public String takesLotsOfParameters(String string, Integer integer, Float f, Boolean b) {
            System.out.println("string:  "+ string);
            System.out.println("int:     "+ integer);
            System.out.println("float:   "+ f);
            System.out.println("boolean: "+ b);
            return "Success";
        }

        @Override
        public String getReadOnly() {
            return "readonly";
        }

        @Override
        public String getMessageError() {
            return message;
        }

        @Override
        public void setMessageError(String message) {
            throw new RuntimeException("always fail");
        }

        @Override
        public String getDate() {
            return (new Date()).toString();
        }

        @Override
        public long getTimeInMillis() {
            return System.currentTimeMillis();
        }

        @Override
        public double getRandom() {
            return Math.random();
        }

        @Override
        public boolean getBoolean() {
            return Math.random() > 0.5;
        }

    }

    public static interface HelloMBean {

        // operations

        public void sayHello();
        public String createGreeting();
        public void alwaysFails();
        public String takes3seconds() throws InterruptedException;

        public String takesLotsOfParameters(String string, Integer integer, Float f, Boolean b);

        // attributes

        // a read-write attribute called Message of type String
        public String getMessage();
        public void setMessage(String message);
        public String getReadOnly();
        public String getMessageError();
        public void setMessageError(String message);
        public String getDate();
        public long getTimeInMillis();
        public double getRandom();
        public boolean getBoolean();

    }

    private void addSampleMetrics() {
        Metrics.newGauge(JimixSampleJetty.class, "/foo", new Gauge<Long>() {
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
