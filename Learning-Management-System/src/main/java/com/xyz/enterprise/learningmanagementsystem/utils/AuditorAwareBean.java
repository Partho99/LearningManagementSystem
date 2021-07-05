package com.xyz.enterprise.learningmanagementsystem.utils;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareBean implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.ofNullable("partho das");
    }
}
