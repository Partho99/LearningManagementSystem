//package com.xyz.enterprise.learningmanagementsystem.advices;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.Around;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Pointcut;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class LoggingAdvice {
//
//    Logger LOGGER = LoggerFactory.getLogger(LoggingAdvice.class);
//
//    @Pointcut(value = "execution(* com.xyz.enterprise.learningmanagementsystem.resources.*.*(..))")
//    public void loggerPointcut() {
//    }
//
//    @Around("loggerPointcut()")
//    public Object applicationLogger(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
//        ObjectMapper objectMapper = new ObjectMapper();
//        String methodName = proceedingJoinPoint.getSignature().getName();
//        String className = proceedingJoinPoint.getTarget().getClass().toString();
//        Object[] argumentArray = proceedingJoinPoint.getArgs();
//
//        LOGGER.info("Method invoked " + className + " : " + methodName + "()" + " arguments : "
//                + objectMapper.writeValueAsString(argumentArray));
//
//        Object object = proceedingJoinPoint.proceed();
//
//        LOGGER.info(className + " : " + methodName + "()" + " Response : " + objectMapper.writeValueAsString(object));
//        return object;
//    }
//}
