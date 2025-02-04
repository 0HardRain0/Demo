import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/postApi';
import { Post } from '../types/interfaces';

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getPosts();
            setPosts(data);
        })();
    }, []);

    return (
        <div className="min-h-screen bg-sky-100 flex flex-col">
        {/* 상단바(헤더) */}
        <nav className="bg-sky-600 text-white py-4 text-center">
          <h1 className="text-2xl font-semibold">My Skyblue Board</h1>
          <h2 className="text-red-500 text-3xl font-bold underline">Hello world!</h2>
        </nav>
        
        {/* 메인 컨테이너 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl mx-auto my-8 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-sky-700">게시글 목록</h2>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.content}</p>
                  <span className="text-sm text-gray-400 block mt-1">
                    by {post.author}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
    );
}

export default PostList;