import React, { useState } from 'react';
import { createReply } from '../api/postApi';
import { PostRequest, ReplyFormProps } from '../types/interfaces';

const ReplyForm: React.FC<ReplyFormProps> = ({ parentId, onReplyCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const replyData: PostRequest = { title, content, author };
        await createReply(parentId, replyData);

        setTitle('');
        setContent('');
        setAuthor('');
        onReplyCreated();
    };

    return(
        <form onSubmit={handleSubmit} className="mt-2 ml-4">
            <div>
                <label className="block text-sm font-medium">답글 제목</label>
                <input
                    type="text"
                    className="border w-full p-1 mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block test-sm font-medium">내용</label>
                <textarea
                    className="border w-full p-1 mb-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">작성자</label>
                <input
                    type="text"
                    className="border w-full p-1 mb-2"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <button className="bg-sky-500 text-white px-3 py-1 rounded-md" type="submit">
                답글 등록
            </button>
        </form>
    );
};

export default ReplyForm;