package org.woelker.jimix.core;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Serializable;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.*;
import org.junit.Test;

public class JsonWriterTest {

    @Test
    public void serializeNull() throws Exception {
        verifyRoundTrip(null);
    }

    @Test
    public void serializeString() throws Exception {
        verifyRoundTrip("foo");
    }

    @Test
    public void serializeStringWithQuotes() throws Exception {
        verifyRoundTrip("\"foo\"");
    }

    @Test
    public void serializeStringWithBackslash() throws Exception {
        verifyRoundTrip("\\foo");
    }

    @Test
    public void serializeStringWithQuoteAndBackslash() throws Exception {
        verifyRoundTrip("\\foo\"");
    }

    @Test
    public void serializeStringWithNewline() throws Exception {
        verifyRoundTrip("fo\no");
    }

    @Test
    public void serializeDouble() throws Exception {
        verifyRoundTrip(1.25);
    }

    @Test
    public void serializeDoubleMaxValue() throws Exception {
        verifyRoundTrip(Double.MAX_VALUE);
    }

    @Test
    public void serializeDoubleMinValue() throws Exception {
        verifyRoundTrip(Double.MIN_VALUE);
    }

    @Test
    public void serializeNan() throws Exception {
        verify(Double.NaN, null);
    }

    @Test
    public void serializePositiveInfinity() throws Exception {
        verify(Double.POSITIVE_INFINITY, null);
    }

    @Test
    public void serializeNegativeInfinity() throws Exception {
        verify(Double.NEGATIVE_INFINITY, null);
    }

    @Test
    public void serializeBigDouble() throws Exception {
        verifyRoundTrip(1.25e44);
    }

    @Test
    public void serializeSmallDouble() throws Exception {
        verifyRoundTrip(-1.25e-44);
    }

    @Test
    public void serializeTrue() throws Exception {
        verifyRoundTrip(true);
    }

    @Test
    public void serializeFalse() throws Exception {
        verifyRoundTrip(false);
    }

    @Test
    public void serializeList() throws Exception {
        verifyRoundTrip(Arrays.asList(1.0, "foo", null, true, false, "bar"));
    }

    @Test
    public void serializeArray() throws Exception {
        List<? extends Serializable> list = Arrays.asList(1.0, "foo", null, true, false, "bar");
        verify(list.toArray(), list);
    }

    @Test
    public void serializeMap() throws Exception {
        final HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("foo", "bar");
        map.put("foo2", 1.0);
        map.put("foo3", false);
        map.put("foo4", Arrays.asList(1.0, "foo", null, true, false, "bar"));
        verifyRoundTrip(map);
    }

    @Test
    public void serializeComplex() throws Exception {
        final HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("foo", "bar");
        map.put("foo2", 1.0);
        map.put("foo3", false);
        map.put("foo4", Arrays.asList(1.0, "foo", null, true, false, "bar"));
        verifyRoundTrip(Arrays.asList(1.0, "foo", null, true, false, "bar", map));
    }

    @Test
    public void serializeUnknown() throws Exception {
        verify(new Object() {
            public String toString() {
                return "foo";
            }
        }, "foo");
    }

    private <T> void verifyRoundTrip(T original) throws Exception {
        final ByteArrayOutputStream baos = new ByteArrayOutputStream();
        new JsonWriter(baos).serialize(original);
        ObjectMapper mapper = new ObjectMapper();
        T roundTripped = mapper.readValue(new ByteArrayInputStream(baos.toByteArray()),
                new TypeReference<T>() {
                });

        assertEquals(original, roundTripped);

    }

    private void verify(Object original, Object expected) throws Exception {
        final ByteArrayOutputStream baos = new ByteArrayOutputStream();
        new JsonWriter(baos).serialize(original);
        ObjectMapper mapper = new ObjectMapper();
        Object roundTripped = mapper.readValue(new ByteArrayInputStream(baos.toByteArray()),
                new TypeReference<Object>() {
                });

        assertEquals(expected, roundTripped);
    }

}
