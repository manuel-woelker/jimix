package org.woelker.jimix.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class JimixIOUtils {

    public static void copy(InputStream input, OutputStream output) {
        try {
            byte[] buffer = new byte[4096];
            int len;
            while ((len = input.read(buffer)) != -1) {
                output.write(buffer, 0, len);
            }
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
