package com.xyz.enterprise.learningmanagementsystem.entities;

import java.io.Serializable;

public class CustomPrincipal implements Serializable {

    private String username;
    private String email;
    public String scope;
    public boolean enabled;

    public CustomPrincipal() {
    }

    public CustomPrincipal(String username, String email, String scope) {
        this.username = username;
        this.email = email;
        this.scope = scope;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
