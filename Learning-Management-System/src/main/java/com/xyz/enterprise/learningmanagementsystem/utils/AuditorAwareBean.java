package com.xyz.enterprise.learningmanagementsystem.utils;

import com.xyz.enterprise.learningmanagementsystem.entities.UserPrincipal;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareBean implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {

        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        String user = principal != null ? principal.getFullName() : "System";
        return Optional.ofNullable(user);
    }
}
