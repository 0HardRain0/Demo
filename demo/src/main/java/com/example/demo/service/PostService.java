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

    public BoardPost createPost(BoardPost boardPost, Long parentId) {
        if (parentId != null) {
            BoardPost parentPost = getPostById(parentId);
            boardPost.setParent(parentPost);
            parentPost.getReplies().add(boardPost);
        }
        return postRepository.save(boardPost);
    }

    public BoardPost updatePost(Long id, BoardPost updatedPost) {
        BoardPost existing = getPostById(id);
        existing.setTitle(updatedPost.getTitle());
        existing.setContent(updatedPost.getContent());
        existing.setAuthor(updatedPost.getAuthor());
        return postRepository.save(existing);
    }

    public void deletePost(Long id) {
        if(!postRepository.existsById(id)) {
            throw new RuntimeException(id + "번 의 게시글을 찾을 수가 없습니다.");
        }
        postRepository.deleteById(id);
    }
}
