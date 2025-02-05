import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../api/postApi';
import { Post } from '../types/interfaces';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            loadPost(Number(id));
        }
    }, [id]);

    const loadPost = async (postId: number) => {
        const post = await getPostById(postId);
        setPost(post || null);
    }

    const handleDelete = async () => {
        if (!id) return;
        await deletePost(Number(id));
        navigate('/');
    };

    const handleGoBack = () => {
        navigate('/');
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-sky-100 flex flex-col">
                <div className="bg-sky-600 text-white p-4">게시판</div>
                <div className="flex-1 flex justify-center items-start p-4">
                    <div className="bg-white w-full max-w-lg p-6 rounded shadow">
                        <p>Loading or Not Found...</p>
                        <button onClick={handleGoBack} className="px-3 py-1 bg-gray-600 rounded">
                            목록으로
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-sky-100 flex flex-col">
          <div className="bg-sky-600 text-white p-4">My Board</div>
          <div className="flex-1 flex justify-center items-start p-4">
            <div className="bg-white w-full max-w-lg p-6 rounded shadow">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.content}</p>
              <p className="text-sm text-gray-400">by {post.author}</p>
              <button onClick={handleGoBack} className="mt-4 px-3 py-1 bg-gray-300 rounded mr-2">
                목록으로
              </button>
              <button onClick={handleDelete} className="mt-4 px-3 py-1 bg-gray-300 rounded">
                삭제
              </button>
            </div>
          </div>
        </div>
    );
};

export default PostDetail;