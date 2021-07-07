package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.CustomPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceController {

    @GetMapping("/admins")
    @PreAuthorize("hasAuthority('role_admin')")
    public String context() {
        CustomPrincipal principal = (CustomPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        return principal.getUsername() + "  " + principal.getEmail() + "  " + principal.getScope() + "  " + principal.isEnabled();
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user')")
    public String secured(CustomPrincipal principal) {
        return principal.getUsername() + "  " + principal.getEmail() + "  " + principal.getScope() + "  " + principal.isEnabled();
    }

    @GetMapping("/common")
    public String general() {
        return "common api access";
    }
}
