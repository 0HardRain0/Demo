import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../api/postApi';
import { Post, PostDetailProps } from '../types/interfaces';

function PostDetail({ postId, onDelete }: PostDetailProps) {
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        (async () => {
            const data = await getPostById(postId);
            setPost(data);
        })();
    }, [postId]);

    const handleDelete = async () => {
        await deletePost(postId);
        if (onDelete) {
            onDelete();
        }
    };

    if (!post) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.author}</p>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
}

export default PostDetail;