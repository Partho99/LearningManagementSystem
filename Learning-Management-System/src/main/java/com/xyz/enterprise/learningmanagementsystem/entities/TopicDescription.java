package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;

@Entity
public class TopicDescription extends  AuditableEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String description;

    @Lob
    private String learningFromThisTopic;

    @Lob
    private String eligibleForThisTopic;

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

    public String getLearningFromThisTopic() {
        return learningFromThisTopic;
    }

    public void setLearningFromThisTopic(String learningFromThisTopic) {
        this.learningFromThisTopic = learningFromThisTopic;
    }

    public String getEligibleForThisTopic() {
        return eligibleForThisTopic;
    }

    public void setEligibleForThisTopic(String eligibleForThisTopic) {
        this.eligibleForThisTopic = eligibleForThisTopic;
    }
}
