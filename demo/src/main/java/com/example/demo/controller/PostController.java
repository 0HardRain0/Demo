package com.example.demo.controller;

import com.example.demo.entity.BoardPost;
import com.example.demo.repository.PostRepository;
import com.example.demo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    @GetMapping
    public List<BoardPost> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public BoardPost getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public BoardPost createPost(@RequestBody BoardPost boardPost) {
        return postService.createPost(boardPost, null);
    }

    @PutMapping("/{id}")
    public BoardPost updatePost(@PathVariable Long id, @RequestBody BoardPost boardPost) {
        return postService.updatePost(id, boardPost);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    //답글
    @PostMapping("/{parentId}/reply")
    public BoardPost createReply(@PathVariable Long parentId, @RequestBody BoardPost boardPost) {
        return postService.createPost(boardPost, parentId);
    }
}
