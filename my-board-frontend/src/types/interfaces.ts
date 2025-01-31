export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

export interface PostFormProps {
    existingPost?: Post;
    onSubmit?: () => void;
}

export interface PostDetailProps {
    postId: number;
    onDelete?: () => void;
}
