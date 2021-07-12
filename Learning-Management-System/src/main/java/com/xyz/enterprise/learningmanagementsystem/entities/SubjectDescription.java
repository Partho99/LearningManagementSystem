package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;

@Entity
public class SubjectDescription extends AuditableEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String description;

    @Lob
    private String learningFromThisSubject;

    @Lob
    private String eligibleForThisSubject;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLearningFromThisSubject() {
        return learningFromThisSubject;
    }

    public void setLearningFromThisSubject(String learningFromThisSubject) {
        this.learningFromThisSubject = learningFromThisSubject;
    }

    public String getEligibleForThisSubject() {
        return eligibleForThisSubject;
    }

    public void setEligibleForThisSubject(String eligibleForThisSubject) {
        this.eligibleForThisSubject = eligibleForThisSubject;
    }
}
