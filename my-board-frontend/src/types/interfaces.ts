export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    parent?: Post;
    replies?: Post[];
}

export interface PostRequest {
    title: string;
    content: string;
    author: string;
}

export interface PostFormProps {
    existingPost?: Post;
    // onSubmit?: () => void;
    onPostCreated: () => void;
}

export interface PostDetailProps {
    postId: number;
    onDelete?: () => void;
}

export interface ReplyFormProps {
    parentId: number;
    onReplyCreated: () => void;
}