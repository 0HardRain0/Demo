import React, { useState, FormEvent } from 'react';
import { createPost, updatePost } from '../api/postApi';

interface Post {
    id?: number;
    title: string;
    content: string;
    author: string;
}

interface PostFormProps {
    existingPost?: Post;
    onSubmit?: () => void;
}

function PostForm({ existingPost, onSubmit }: PostFormProps) {
    const [title, setTitle] = useState(existingPost?.title || '');
    const [content, setContent] = useState(existingPost?.content || '');
    const [author, setAuthor] = useState(existingPost?.author || '');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const postData: Omit<Post, 'id'> = { title, content, author };
        if (existingPost && existingPost.id !== undefined) {
            // 수정
            await updatePost(existingPost.id, postData);
        } else {
            // 생성
            await createPost(postData);
        }
        if (onSubmit) {
            onSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>내용</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <label>작성자</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <button type="submit">
              {existingPost ? '수정' : '등록'}
            </button>
        </form>
    );
}

export default PostForm;