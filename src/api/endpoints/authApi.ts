import axios from "axios"
import { apiClient, urls } from ".."
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "../../types/authTypes"



export const loginApi = async (loginRequest: LoginRequest) => {
    const res = await apiClient.post<LoginResponse>(urls.auth.login(), loginRequest)
    return res
}

export const getCurrentUserApi = async (accessToken: string) => {
    const res = await apiClient.get(urls.auth.me(), {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res
}

export const refreshTokensApi = async (refreshTokenRequest: RefreshTokenRequest) => {
    const res = await apiClient.post<RefreshTokenResponse>(urls.auth.refreshTokens(), { refreshToken: refreshTokenRequest, expiresInMins: 1 })
    console.log('Refresh Token!!!')
    return res
}