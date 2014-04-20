package org.woelker.jimix.dropwizard;

import io.dropwizard.Bundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.woelker.jimix.servlet.JimixServlet;

public class JimixBundle implements Bundle {

    @Override
    public void initialize(Bootstrap<?> bootstrap) {

    }

    @Override
    public void run(Environment environment) {
        environment.servlets().addServlet("/jimix", new JimixServlet()).addMapping("/jimix/*");

    }
}
