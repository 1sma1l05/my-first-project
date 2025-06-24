import axios from "axios"

export const apiClient = axios.create({
    baseURL: 'https://dummyjson.com/auth/',
    headers: {
        "Content-Type": "application/json"
    }
})

export const urls = {
    auth: {
        login: () => {
            return 'https://dummyjson.com/auth/login'
        },
        me: () => {
            return 'https://dummyjson.com/auth/me'
        },
        refreshTokens: () => {
            return 'https://dummyjson.com/auth/refresh'
        }
    },
    post: {
        getAllPosts: () => {
            return 'https://dummyjson.com/posts'
        },
        getSinglePost: (id: string) => {
            return `https://dummyjson.com/posts/${id}`
        },
        searchPost: (searchName: string) => {
            return `https://dummyjson.com/posts/search?q=${searchName}`
        },
        getPostsTagList: () => {
            return 'https://dummyjson.com/posts/tag-list'
        },
        getPostsByTag: (tagName: string) => {
            return `https://dummyjson.com/posts/tag/${tagName}`
        },
        getPostComments: (postId: string) => {
            return `https://dummyjson.com/posts/${postId}/comments`
        }
    },
    user: {
        getAllUsers: () => {
            return 'https://dummyjson.com/users'
        },
        getSingleUser: (userId: string) => {
            return `https://dummyjson.com/users/${userId}`
        }
    }
}