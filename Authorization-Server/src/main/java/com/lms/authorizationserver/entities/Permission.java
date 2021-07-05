package com.lms.authorizationserver.entities;

import javax.persistence.Entity;

@Entity
public class Permission extends AuditableEntity {


    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
