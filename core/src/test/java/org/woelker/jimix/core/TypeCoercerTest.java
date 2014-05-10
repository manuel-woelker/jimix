package org.woelker.jimix.core;

import static org.junit.Assert.*;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

public class TypeCoercerTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    TypeCoercer typeCoercer = new TypeCoercer();

    @Test
    public void testString1() {
        verify("", "", String.class);
    }

    @Test
    public void testString2() {
        verify("abc", "abc", String.class);
    }

    @Test
    public void testInteger() {
        verify(1, "1", Integer.class);
    }

    @Test
    public void testFloat() {
        verify(1f, "1", Float.class);
    }

    @Test
    public void testBooleanTrue() {
        verify(true, "true", Boolean.class);
    }

    @Test
    public void testBooleanFalse() {
        verify(false, "false", Boolean.class);
    }

    @Test
    public void testInt() {
        verify(42, "42", "int");
    }

    @Test
    public void testIntFail() {
        expectedException.expectMessage("Unable to coerce 'asf' to class java.lang.Integer");
        typeCoercer.coerce("asf", "int");
    }

    private void verify(Object expected, String input, Class<?> aClass) {
        assertEquals(expected, typeCoercer.coerce(input, aClass));
    }

    private void verify(Object expected, String input, String className) {
        assertEquals(expected, typeCoercer.coerce(input, className));
    }

}
