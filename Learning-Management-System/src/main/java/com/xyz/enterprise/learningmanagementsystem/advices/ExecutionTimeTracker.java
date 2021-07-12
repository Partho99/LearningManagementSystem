package com.xyz.enterprise.learningmanagementsystem.advices;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ExecutionTimeTracker {

    private static Logger LOGGER = LoggerFactory.getLogger(ExecutionTimeTracker.class);

    @Around("@annotation(com.xyz.enterprise.learningmanagementsystem.annotations.ExecutionTimeTracker)")
    public Object timeTracker(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object object = proceedingJoinPoint.proceed();
        long endTime = System.currentTimeMillis();

        LOGGER.info("Method name " + proceedingJoinPoint.getSignature() + " time to execute : " + (endTime - startTime));
        return object;
    }
}
