import axios from 'axios';
import { Post, PostRequest } from '../types/interfaces';

// 백엔드 주소
const API_BASE_URL = 'http://localhost:8080/api/posts';

export const getPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_BASE_URL);
    return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createPost = async (postData: PostRequest): Promise<Post> => {
    const response = await axios.post<Post>(API_BASE_URL, postData);
    return response.data;
};

export const updatePost = async (id: number, postData: Omit<Post, 'id'>): Promise<Post> => {
    const response = await axios.put<Post>(`${API_BASE_URL}/${id}`, postData);
    return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

// 답글 생성
export async function createReply(parentId: number, replyData: PostRequest): Promise<Post> {
    const response = await axios.post<Post>(`${API_BASE_URL}/${parentId}/reply`, replyData);
    return response.data;
}
