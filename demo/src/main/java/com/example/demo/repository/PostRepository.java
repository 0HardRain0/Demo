package com.example.demo.repository;

import com.example.demo.entity.BoardPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<BoardPost, Long> {
}
