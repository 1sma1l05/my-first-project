import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostsApi, getPostsByTagApi, getPostsTagListApi, getSinglePostApi, searchPostApi } from "../../api/endpoints/postApi";
import { GetAllPostsResponse } from "./postTypes";

// Get All Posts
export const getAllPosts = createAsyncThunk<GetAllPostsResponse>(
    'post/getAllPosts',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await getAllPostsApi()
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            await dispatch(getPostsTagList())
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

// Get Single Post
export const getSinglePost = createAsyncThunk(
    'post/getSinglePost',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await getSinglePostApi(id)
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

// Search Posts
export const searchPost = createAsyncThunk(
    'post/searchPost',
    async (searchName: string, { rejectWithValue }) => {
        try {
            const res = await searchPostApi(searchName)
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

// Get Posts Tag List
export const getPostsTagList = createAsyncThunk(
    'post/getPostsTagList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getPostsTagListApi()
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

// Get Posts By Tag
export const getPostsByTag = createAsyncThunk(
    'post/getPostsByTag',
    async (tagName: string, { rejectWithValue }) => {
        try {
            const res = await getPostsByTagApi(tagName)
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

// Get All Posts By User Id
