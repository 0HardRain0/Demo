import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/postApi';
import { Post } from '../types/interfaces';

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getPosts();
            setPosts(data);
        })();
    }, []);

    const handleClickPost = (id: number) => {
      navigate(`/post/${id}`);
    };

    return (
        <div className="min-h-screen bg-sky-100 flex flex-col">
        {/* 상단바(헤더) */}
        <nav className="bg-sky-600 text-white py-4 text-center">
          <h1 className="text-2xl font-semibold">My Skyblue Board</h1>
        </nav>
        
        {/* 메인 컨테이너 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl mx-auto my-8 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-sky-700">게시글 목록</h2>
            <button
              onClick={() => navigate('/post/new')}
              className="px-3 py-1 bg-sky-600 text-white rounded-md"
            >
              새 글 작성
            </button>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  onClick={() => handleClickPost(post.id)}
                  className="p-3 border-b last:border-none cursor-pointer hover:bg-gray-100"
                >
                  <strong>{post.title}</strong>
                  <span className="block text-sm text-gray-500">by {post.author}</span> 
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
    );
}

export default PostList;