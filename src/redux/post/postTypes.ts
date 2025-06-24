export type PostState = {
    loading: boolean
    error: string | null
    post: GetAllPostsResponse,
    postDetail: Post | null,
    tags: string[] | []
}

export type GetAllPostsResponse = {
    posts: Post[] | []
    total: number | null
    skip: number | null
    limit: number | null
}

export type Post = {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
}

export type Reactions = {
    likes: number
    dislikes: number
}

// Post Comments
export type GetPostCommentsResponse = {
    comments: Comment[]
    total: number
    skip: number
    limit: number
}

export type Comment = {
    id: number
    body: string
    postId: number
    likes: number
    user: User
}

export type User = {
    id: number
    username: string
    fullName: string
}
