package org.woelker.jimix.servlet;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import javax.management.ObjectName;

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
        } else if (object == null) {
            writer.print("null");
        } else if (object instanceof Number) {
            writer.print(object.toString());
        } else if (object instanceof Boolean) {
            writer.print(object.toString());
        } else if (object instanceof ObjectName) {
            writer.print("\"");
            writer.print(object.toString());
            writer.print("\"");
        } else {
            System.err.println("Unhandled type: "+object.getClass());
            writer.print("null");
        }

    }

    private void serializeMap(Map<Object, Object> map, int indentation) {
        writer.print("{");
        String comma = "";
        for(Map.Entry<Object, Object> value: map.entrySet()) {
            writer.println(comma);
            indent(indentation+1);
            writer.print("\"");
            writer.print(value.getKey().toString());
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
