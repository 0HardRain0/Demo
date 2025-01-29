import axios from 'axios';

// 백엔드 주소
const API_BASE_URL = 'http://localhost:8080/api/posts';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    // Add other fields as necessary
}

export const getPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_BASE_URL);
    return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createPost = async (postData: Omit<Post, 'id'>): Promise<Post> => {
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

