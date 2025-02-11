import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../api/postApi';
import { Post, PostFormProps } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';

const PostForm: React.FC<PostFormProps> = ({ existingPost, onPostCreatedOrUpdate }) => {
    const [title, setTitle] = useState(existingPost?.title || '');
    const [content, setContent] = useState(existingPost?.content || '');
    const [author, setAuthor] = useState(existingPost?.author || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (existingPost) {
            setTitle(existingPost.title);
            setContent(existingPost.content);
            setAuthor(existingPost.author);
        }
    }, [existingPost]);

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
        if (onPostCreatedOrUpdate) {
            onPostCreatedOrUpdate();
        }
    };

    return (
        <div className="mb-4 p-4 border rounded bg-gray-50 shadow-md">
            <h3 className="text-lg font-bold mb-3 text-sky-700">
                {existingPost ? '게시글 수정' : '새 게시글 작성'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        제목
                    </label>
                    <input
                        className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        내용
                    </label>
                    <textarea
                        className="border border-gray-300 rounded w-full p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-sky-200"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        작성자
                    </label>
                    <input
                        className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="작성자 이름"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1 rounded font-medium"
                        onClick={() => navigate('/')}
                    >
                        {existingPost ? '수정하기' : '등록하기'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;