package com.xyz.enterprise.learningmanagementsystem.annotations;

import org.springframework.core.annotation.SynthesizedAnnotation;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

import java.lang.annotation.Annotation;

public class CustomImplPathVariable implements SynthesizedAnnotation {

    static final RequestBody REQUEST_BODY_ANNOTATION = new RequestBody() {
        public Class<? extends Annotation> annotationType() {
            return RequestBody.class;
        }

        public boolean required() {
            return true;
        }
    };
    static final CustomPathVariable PATH_VARIABLE_ANNOTATION = customPathVariable("id");
    static final ApiIgnore API_IGNORE_ANNOTATION = new ApiIgnore() {
        public String value() {
            return "Parameter is ignored";
        }

        public Class<? extends Annotation> annotationType() {
            return ApiIgnore.class;
        }
    };

    static CustomPathVariable customPathVariable(final String parameterName) {
        return new CustomPathVariable() {
            public Class<? extends Annotation> annotationType() {
                return CustomPathVariable.class;
            }

            public String value() {
                return parameterName;
            }

            public String name() {
                return parameterName;
            }

            public boolean required() {
                return true;
            }
        };
    }
}
