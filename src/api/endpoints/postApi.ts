import { apiClient, urls } from ".."
import { GetAllPostsResponse } from "../../redux/post/postTypes"

// Get All Post
export const getAllPostsApi = async () => {
    const res = await apiClient.get<GetAllPostsResponse>(urls.post.getAllPosts())
    return res
}

// Get Single Post
export const getSinglePostApi = async (id: string) => {
    const res = await apiClient.get(urls.post.getSinglePost(id))
    return res
}

// Search POst
export const searchPostApi = async (searchName: string) => {
    const res = await apiClient.get(urls.post.searchPost(searchName))
    return res
}

// Get Posts Tag List
export const getPostsTagListApi = async () => {
    const res = await apiClient.get(urls.post.getPostsTagList())
    return res
}

// Get Posts By Tag
export const getPostsByTagApi = async (tagName: string) => {
    const res = await apiClient.get(urls.post.getPostsByTag(tagName))
    return res
}

// Get All Posts By User Id

// Get Post Comments
export const getPostCommentsApi = async (postId: string) => {
    const res = await apiClient.get(urls.post.getPostComments(postId))
    return res.data
}