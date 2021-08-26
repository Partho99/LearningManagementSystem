package com.xyz.enterprise.learningmanagementsystem.entities;

import java.io.Serializable;

public class UserPrincipal implements Serializable {

    private String fullName;
    private String email;
    public String scope;
    public boolean enabled;

    public UserPrincipal() {
    }

    public UserPrincipal(String fullName, String email, String scope) {
        this.fullName = fullName;
        this.email = email;
        this.scope = scope;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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
