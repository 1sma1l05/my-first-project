import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersApi, getSingleUserApi } from "../../api/endpoints/userApi";
import { getSinglePostApi } from "../../api/endpoints/postApi";

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllUsersApi()
            if (res.status !== 200) {
                throw new Error('Server error')
            } else {
                return res.data
            }
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

export const getSingleUser = createAsyncThunk(
    'user/getSingleUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await getSingleUserApi(userId)
            if (res.status !== 200) {
                throw new Error('Server error')
            } else {
                return res.data
            }
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)