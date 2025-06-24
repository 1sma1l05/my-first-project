import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsResponse, Post, PostState } from "./postTypes";
import { getAllPosts, getPostsByTag, getPostsTagList, getSinglePost, searchPost } from "./postThunks";

const initialState: PostState = {
    loading: false,
    error: null,
    post: {
        posts: [],
        total: null,
        skip: null,
        limit: null
    },
    postDetail: null,
    tags: [],
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all posts
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<GetAllPostsResponse>) => {
                state.loading = false;
                state.post = action.payload;
            })

            // Get a single post
            .addCase(getSinglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                state.postDetail = action.payload
            })

            // Search Posts
            .addCase(searchPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPost.fulfilled, (state, action: PayloadAction<GetAllPostsResponse>) => {
                state.loading = false;
                state.post = action.payload
            })

            // Get Posts Tag List
            .addCase(getPostsTagList.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.loading = false;
                state.tags = action.payload
            })

            // Get Posts By Tag
            .addCase(getPostsByTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
    }
})

export default postSlice.reducer
