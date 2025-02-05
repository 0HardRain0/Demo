import React, { useState } from 'react';
import { createPost, updatePost } from '../api/postApi';
import { Post, PostFormProps } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';

const PostForm: React.FC<PostFormProps> = ({ existingPost, onPostCreated }) => {
    const [title, setTitle] = useState(existingPost?.title || '');
    const [content, setContent] = useState(existingPost?.content || '');
    const [author, setAuthor] = useState(existingPost?.author || '');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData: Omit<Post, 'id'> = { title, content, author };
        if (existingPost && existingPost.id !== undefined) {
            // 수정
            await updatePost(existingPost.id, postData);
        } else {
            // 생성
            await createPost(postData);
        }
        if (onPostCreated) {
            onPostCreated();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                    className="border w-full p-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea
                    className="border w-full p-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium mb-1">작성자</label>
                <input
                    className="border w-full p-2"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <button 
                type="submit" 
                className="bg-sky-500 text-white px-4 py-2 rounded-md"
                onClick={() => navigate('/')}
            >
                {existingPost ? '수정' : '등록'}
            </button>
        </form>
    );
};

export default PostForm;