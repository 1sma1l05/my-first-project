import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserApi, loginApi, refreshTokensApi } from "../../api/endpoints/authApi";
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "../../types/authTypes";
import { LocalStorage } from "../../localStorage/localStorage";

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
    'auth/login',
    async (loginRequest: LoginRequest, { rejectWithValue, dispatch }) => {
        try {
            const res = await loginApi(loginRequest)
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            LocalStorage.token.accessToken.setAccessToken(res.data.accessToken);
            LocalStorage.token.refreshToken.setRefreshToken(res.data.refreshToken);
            await dispatch(getCurrentUser(LocalStorage.token.accessToken.getAccessToken()))
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        const accessToken = LocalStorage.token.accessToken.getAccessToken()
        try {
            const res = await getCurrentUserApi(accessToken)
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

export const refreshTokens = createAsyncThunk<RefreshTokenResponse, RefreshTokenRequest>(
    'auth/refreshTokens',
    async (refreshTokenRequest: RefreshTokenRequest, { rejectWithValue }) => {
        try {
            const res = await refreshTokensApi(refreshTokenRequest)
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            const { accessToken, refreshToken } = res.data
            LocalStorage.token.accessToken.setAccessToken(accessToken)
            LocalStorage.token.refreshToken.setRefreshToken(refreshToken)
            return res.data
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
)

