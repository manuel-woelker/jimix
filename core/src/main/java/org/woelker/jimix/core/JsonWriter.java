package org.woelker.jimix.core;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.management.ObjectName;

class JsonWriter {

    private final OutputStream outputStream;
    private final Pattern quotePattern = Pattern.compile("[\"]");
    private final String quoteReplacement = Matcher.quoteReplacement("\\\"");
    private final Pattern backslashPattern = Pattern.compile("[\\\\]");
    private final String backslashReplacement = Matcher.quoteReplacement("\\\\");
    private final Pattern newlinePattern = Pattern.compile("\n");
    private final String newlineReplacement = Matcher.quoteReplacement("\\n");

    public JsonWriter(OutputStream outputStream) {
        this.outputStream = outputStream;
        writer = new PrintWriter(outputStream);
    }
    private final PrintWriter writer;

    void serialize(Object object) {
        serialize(object, 0);
        writer.flush();
    }

    private void serialize(Object object, int indentation) {
        if (object instanceof String) {
            serializeString((String) object);
        } else if (object instanceof Map) {
            serializeMap((Map) object, indentation);
        } else if (object instanceof List) {
            serializeList((List) object, indentation);
        } else if (object instanceof Object[]) {
            serializeList(Arrays.asList((Object[])object), indentation);
        } else if (object == null) {
            writer.print("null");
        } else if (object instanceof Number) {
            writer.print(object.toString());
        } else if (object instanceof Boolean) {
            writer.print(object.toString());
        } else if (object instanceof ObjectName) {
            serializeString(object.toString());
        } else {
            serializeString(object.toString());
        }

    }

    private void serializeMap(Map<Object, Object> map, int indentation) {
        writer.print("{");
        String comma = "";
        for (Map.Entry<Object, Object> value : map.entrySet()) {
            writer.println(comma);
            indent(indentation + 1);
            writer.print("\"");
            writer.print(value.getKey().toString());
            writer.print("\": ");
            serialize(value.getValue(), indentation + 1);
            comma = ",";
        }
        writer.println();
        indent(indentation);
        writer.print("}");
    }

    private void indent(int indentation) {
        for (int i = 0; i < indentation; i++) {
            writer.print("\t");
        }
    }

    private void serializeList(List list, int indentation) {
        writer.print("[");
        String comma = "";
        for (Object value : list) {
            writer.println(comma);
            indent(indentation + 1);
            serialize(value, indentation + 1);
            comma = ",";
        }
        writer.println();
        indent(indentation);
        writer.print("]");
    }

    private void serializeString(String string) {
        writer.print("\"");
        String backslashesReplaced = backslashPattern.matcher(string).replaceAll(backslashReplacement);
        String quotesReplaced = quotePattern.matcher(backslashesReplaced).replaceAll(quoteReplacement);
        String newlinesReplaced = newlinePattern.matcher(quotesReplaced).replaceAll(newlineReplacement);
        writer.print(newlinesReplaced);
        writer.print("\"");
    }

}
