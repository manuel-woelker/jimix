package org.woelker.jimix.servlet;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

class JsonWriter {

    private final OutputStream outputStream;

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
            writer.print("\"");
            writer.print((String) object);
            writer.print("\"");
        } else if (object instanceof Map) {
            serializeMap((Map) object, indentation);
        } else if (object instanceof List) {
            serializeList((List) object, indentation);
        } else {
            writer.print("null");
        }

    }

    private void serializeMap(Map<String, Object> map, int indentation) {
        writer.print("{");
        String comma = "";
        for(Map.Entry<String, Object> value: map.entrySet()) {
            writer.println(comma);
            indent(indentation+1);
            writer.print("\"");
            writer.print(value.getKey());
            writer.print("\": ");
            serialize(value.getValue(), indentation+1);
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
        for(Object value: list) {
            writer.println(comma);
            indent(indentation+1);
            serialize(value, indentation+1);
            comma = ",";
        }
        writer.println();
        indent(indentation);
        writer.print("]");
    }

}
