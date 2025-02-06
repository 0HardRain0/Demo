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
    existingPost?: Post | null;
    // onSubmit?: () => void;
    onPostCreated: () => void;
    // onCancel: () => void;
}

export interface ReplyFormProps {
    parentId: number;
    onReplyCreated: () => void;
}