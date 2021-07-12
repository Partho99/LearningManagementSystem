package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.UserPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ResourceController {

    @GetMapping("/admins")
    @PreAuthorize("hasAuthority('role_admin')")
    public String context() {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        return principal.getUsername() + "  " + principal.getEmail() + "  " + principal.getScope() + "  " + principal.isEnabled();
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user')")
    public String secured(UserPrincipal principal) {
        return principal.getUsername() + "  " + principal.getEmail() + "  " + principal.getScope() + "  " + principal.isEnabled();
    }

    @GetMapping("/common")
    public String general() {
        return "common api access";
    }
}
