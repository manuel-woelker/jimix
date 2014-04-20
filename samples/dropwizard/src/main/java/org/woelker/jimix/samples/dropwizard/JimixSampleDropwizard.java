package org.woelker.jimix.samples.dropwizard;

import io.dropwizard.Configuration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.Application;
import org.woelker.jimix.dropwizard.JimixBundle;


public class JimixSampleDropwizard extends Application<Configuration> {
    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            args = new String[]{"server"};
        }
        new JimixSampleDropwizard().run(args);
    }

    @Override
    public void initialize(Bootstrap<Configuration> bootstrap) {
        bootstrap.addBundle(new JimixBundle());
    }

    @Override
    public void run(Configuration configuration,
                    Environment environment) {
        // disable jersey to prevent errors due to missing resources
        environment.jersey().disable();
    }
}
