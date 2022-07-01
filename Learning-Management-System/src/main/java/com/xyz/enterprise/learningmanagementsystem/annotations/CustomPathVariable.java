package com.xyz.enterprise.learningmanagementsystem.annotations;

import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.PathVariable;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CustomPathVariable {
    @AliasFor("name")
    String value() default "";

    @AliasFor("value")
    String name() default "";

    boolean required() default true;
}
