import React, { useEffect, useState } from 'react';
import { Post } from '../types/interfaces';
import { getPosts, deletePost } from '../api/postApi';
import PostForm from './PostForm';
import ReplyForm from './ReplyForm';

const BulletinBoard: React.FC = () => {
    const [ posts, setPosts] = useState<Post[]>([]);
    const [ showPostForm, setShowPostForm ] = useState(false);
    const [ replyParentId, setReplyParentId ] = useState<number | null>(null);

    const loadPosts = async () => {
        const data = await getPosts();
        setPosts(data.filter((p) => !p.parent));
    }

    useEffect(() => {
        loadPosts();
    }, []);

    const handleDeletePost = async (id: number) => {
        await deletePost(id);
        await loadPosts();
    };

    const handlePostCreated = async () => {
        setShowPostForm(false);
        await loadPosts();
    };

    const handleReplyCreated = async () => {
        setReplyParentId(null);
        await loadPosts();
    };

    const renderReplies = (replies: Post[] | undefined) => {
        if (!replies || replies.length === 0) return null;
        return (
            <ul className = "ml-6">
                {replies.map((r) => (
                    <li key={r.id} className="border-l pl-2 mt-2">
                        <div className="flex justify-between">
                            <div>
                                <strong>{r.title}</strong> by {r.author}
                            </div>
                            <button
                                onClick={() => handleDeletePost(r.id)}
                                className="text-sm text-red-500 hover:underline"
                            >
                                삭제
                            </button>
                        </div>
                        <p className="text-gray-600 ml-4">{r.content}</p>
                        <button
                            onClick={() => setReplyParentId(r.id)}
                            className="ml-4 text-sm text-sky-600 hover:underline"
                        >
                            답글 달기
                        </button>

                        {renderReplies(r.replies)}
                        {replyParentId === r.id && (
                            <ReplyForm parentId={r.id} onReplyCreated={handleReplyCreated} />
                        )}
                    </li>
                ))}
            </ul>
        ) ;
    };

    return (
        <div className="min-h-screen bg-sky-100 flex flex-col">
            <nav className="bg-sky-600 text-white py-4 text-center">
                <h1 className="text-2xl font-semibold">게시판</h1>
            </nav>

            <div className="flex-1 flex  flex-col items-center justify-start p-4">
                <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-sky-700">게시글 목록</h2>
                        <button
                            onClick={() => setShowPostForm(!showPostForm)}
                            className="px-3 py-1 bg-sky-600 text-white rounded-md"
                        >
                            새 글 작성
                        </button>
                    </div>

                    {showPostForm && <PostForm onPostCreatedOrUpdate={handlePostCreated} />}

                    <ul className="space-y-4 mt-4">
                        {posts.map((post) => (
                            <li key={post.id} className="border-b pb-4 last:border-none">
                                <div className="flex justify-between">
                                    <div>
                                        <strong>{post.title}</strong> by {post.author}
                                    </div>
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        삭제
                                    </button>
                                </div>
                                <p className="text-gray-600 ml-4">{post.content}</p>

                                <button
                                    onClick={() => setReplyParentId(post.id)}
                                    className="ml-4 text-sm text-sky-600 hover:underline"
                                >
                                    답글 달기
                                </button>

                                {renderReplies(post.replies)}
                                {replyParentId === post.id && (
                                    <ReplyForm parentId={post.id} onReplyCreated={handleReplyCreated} />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BulletinBoard;