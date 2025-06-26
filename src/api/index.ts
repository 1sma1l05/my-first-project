import axios from "axios"
import { LocalStorage } from "../localStorage/localStorage"
import { refreshTokensApi } from "./endpoints/authApi"

export const apiClient = axios.create({
    baseURL: 'https://dummyjson.com/auth/',
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (axios.isAxiosError(error)) {
            try {
                const refreshTokenRequest = LocalStorage.token.refreshToken.getRefreshToken();
                const res = await refreshTokensApi(refreshTokenRequest);
                const { accessToken, refreshToken } = res.data;

                LocalStorage.token.accessToken.setAccessToken(accessToken);
                LocalStorage.token.refreshToken.setRefreshToken(refreshToken);

                if (error.config) {
                    error.config.headers = error.config.headers || {};
                    error.config.headers.Authorization = `Bearer ${accessToken}`;
                    return apiClient.request(error.config);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
    }
)

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