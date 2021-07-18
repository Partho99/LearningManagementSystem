package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;

@Entity
public class CategoryDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String description;

    @Lob
    private String learningFromThisCategory;

    @Lob
    private String eligibleForThisCategory;

    @Lob
    private String CategoryIncludes;

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

    public String getLearningFromThisCategory() {
        return learningFromThisCategory;
    }

    public void setLearningFromThisCategory(String learningFromThisCategory) {
        this.learningFromThisCategory = learningFromThisCategory;
    }

    public String getEligibleForThisCategory() {
        return eligibleForThisCategory;
    }

    public void setEligibleForThisCategory(String eligibleForThisCategory) {
        this.eligibleForThisCategory = eligibleForThisCategory;
    }

    public String getCategoryIncludes() {
        return CategoryIncludes;
    }

    public void setCategoryIncludes(String categoryIncludes) {
        CategoryIncludes = categoryIncludes;
    }
}
