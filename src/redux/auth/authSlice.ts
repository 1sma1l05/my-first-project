import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";
import { getCurrentUser, login, refreshTokens } from "./authThunks";
import { CurrentUserResponse, LoginResponse, RefreshTokenResponse } from "../../types/authTypes";
import { LocalStorage } from "../../localStorage/localStorage";

const initialState: AuthState = {
    loading: false,
    error: null,
    token: {
        accessToken: LocalStorage.token.accessToken.getAccessToken() || null,
        refreshToken: LocalStorage.token.refreshToken.getRefreshToken() || null
    },
    currentUser: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token.accessToken = null;
            state.token.refreshToken = null;
            LocalStorage.token.accessToken.removeAccessToken();
            LocalStorage.token.refreshToken.removeRefreshToken();
            LocalStorage.loginRequestData.removeLoginRequestData();
        },
        removeCurrentUser: (state) => {
            state.currentUser = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.token.accessToken = action.payload.accessToken;
                state.token.refreshToken = action.payload.refreshToken;
            })

            // GetCurrentUser
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<CurrentUserResponse>) => {
                state.loading = false;
                state.currentUser = action.payload;
            })

            // Refresh Tokens
            .addCase(refreshTokens.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshTokens.fulfilled, (state, action: PayloadAction<RefreshTokenResponse>) => {
                state.loading = false;
                state.token.accessToken = action.payload.accessToken
                state.token.refreshToken = action.payload.refreshToken
                console.log('Токен обновлён')
            })
    }
})

export default authSlice.reducer
export const { logout, removeCurrentUser } = authSlice.actions