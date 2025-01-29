package com.example.demo.service;

import com.example.demo.entity.BoardPost;
import com.example.demo.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<BoardPost> getAllPosts() {
        return postRepository.findAll();
    }

    public BoardPost getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + "번 의 게시글을 찾을 수가 없습니다."));
    }

    public BoardPost createPost(BoardPost boardPost) {
        return postRepository.save(boardPost);
    }

    public BoardPost updatePost(Long id, BoardPost updatedPost) {
        BoardPost boardPost = getPostById(id);
        boardPost.setTitle(updatedPost.getTitle());
        boardPost.setContent(updatedPost.getContent());
        boardPost.setAuthor(updatedPost.getAuthor());
        return postRepository.save(boardPost);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
