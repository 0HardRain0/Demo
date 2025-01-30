import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/postApi';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    // Add other fields as necessary
}

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getPosts();
            setPosts(data);
        })();
    }, []);

    return (
        <div>
            <h2 className="text-red-500 text-3xl font-bold underline">게시글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title} / {post.author}
                    </li>
                ))}
            </ul>
        </div> 
    );
}

export default PostList;