package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.Blog;
import com.xyz.enterprise.learningmanagementsystem.entities.User;
import com.xyz.enterprise.learningmanagementsystem.entities.UserPrincipal;
import com.xyz.enterprise.learningmanagementsystem.service.BlogService;
import com.xyz.enterprise.learningmanagementsystem.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/blog/api/")
public class BlogResource {

    private final BlogService blogService;
    private final UserService userService;

    public BlogResource(BlogService blogService, UserService userService) {
        this.blogService = blogService;
        this.userService = userService;
    }


    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('role_admin','role_instructor')")
    public Blog saveBlog(@RequestBody Blog blog) {
        User user = new User();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (userService.findByUsername(principal.getUsername()).isEmpty()) {
            user.setUsername(principal.getUsername());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            userService.saveUser(user);
        } else if (userService.findByUsername(principal.getUsername()).get().getUsername().equals(principal.getUsername())) {
            user.setId(userService.findByUsername(principal.getUsername()).get().getId());
        }

        user.setId(user.getId());
        blog.setUser(user);
        return blogService.save(blog);
    }

    @DeleteMapping("delete/{id}")
    public String deleteBlog(@PathVariable long id) {
        blogService.deleteById(id);
        return "id no : " + id + " is deleted";
    }

    @GetMapping("show-all-blogs")
    public List<Blog> showAllBlogs() {
        return blogService.findAll();
    }

    @GetMapping("show-all-blogs-by-page/{page}")
    public Page<Blog> showAllBlogsByPage(@PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 9);
        return blogService.findAll(pageable);
    }
}
