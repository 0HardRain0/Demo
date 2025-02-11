import React, { useEffect, useState } from 'react';
import { getPostById, deletePost, createReply } from '../api/postApi';
import { Post } from '../types/interfaces';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [replyForm, setReplyForm] = useState(false);
    const [replyTitle, setReplyTitle] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [replyAuthor, setReplyAuthor] = useState('');

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

    const toggleReplyForm = () => {
        setReplyForm(!replyForm);
    };

    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        const newReply = await createReply(Number(id), {
            title: replyTitle,
            content: replyContent,
            author: replyAuthor
        });

        if (newReply) {
            setReplyTitle('');
            setReplyContent('');
            setReplyAuthor('');
            setReplyForm(false);
            await loadPost(Number(id));
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-sky-100 flex flex-col">
                <div className="bg-sky-600 text-white p-4">게시판</div>
                <div className="flex-1 flex justify-center items-start p-4">
                    <div className="bg-white w-full max-w-lg p-6 rounded shadow">
                        <p>Loading or Not Found...</p>
                        <button 
                          onClick={handleGoBack} 
                          className="px-3 py-1 bg-gray-600 text-white rounded mt-4"
                        >
                            목록으로
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-sky-100 flex flex-col">
            {/* 상단 헤더 */}
          <div className="bg-sky-600 text-white p-4">
            My Board
          </div>
          <div className="flex-1 flex justify-center items-start p-4">
            <div className="bg-white w-full max-w-lg p-6 rounded shadow">
                {/* 게시글 헤더 */}
              <div>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-400">by {post.author}</p>
                
              </div>
              
                {/* 게시글 내용 */}
              <div className="text-gray-700 mb-6">
                <p className="text-gray-600 mb-2">{post.content}</p>
              </div>
              
                {/* 게시글 버튼 */}
              <div>
                <div className="space-x-2 mb-4">
                  <button 
                    onClick={handleGoBack} 
                    className="px-3 py-1 bg-gray-300 rounded mr-2 hover:bg-gray-400"
                  >
                    목록으로
                  </button>
                  <button
                    onClick={toggleReplyForm}
                    className="px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded mr-2"
                  >
                    답글 달기
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="px-3 py-1 bg-red-400 hover:bg-red-600 text-white rounded mr-2"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>

            {/* 답글 목록 */}
            {post.replies && post.replies.length > 0 && (
                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2 text-sky-700">답글</h3>
                    <ul className="space-y-3">
                        {post.replies.map((r) => (
                            <li key={r.id} className="border p-2 rounded bg-gray-50">
                                <h4 className="text-sm font-bold text-gray-700">{r.title}</h4>
                                <p className="text-sm text-gray-600">{r.content}</p>
                                <span className="mt-1 text-xs text-gray-400">by {r.author}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 답글 폼 */}
            {replyForm && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <form onSubmit={handleSubmitReply} className="space-y-3">
                        <h4 className="text-sm font-bold mb-2 text-sky-700">답글 작성</h4>
                        <div className="mb-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">제목</label>
                            <input
                                className="border border-gray-300 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                                type="text"
                                value={replyTitle}
                                onChange={(e) => setReplyTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">내용</label>
                            <textarea
                                className="border border-gray-300 rounded w-full p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-200"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-xs font-medium mb-1">작성자</label>
                            <input
                                className="border border-gray-300 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                                value={replyAuthor}
                                onChange={(e) => setReplyAuthor(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                        >
                            등록
                        </button>
                    </form>
                </div>
            )}
          </div>
        </div>
    );
};

export default PostDetail;