import { LoginRequest } from "../types/authTypes"

export const LocalStorage = {
    token: {
        accessToken: {
            getAccessToken: () => {
                const accessToken = localStorage.getItem('accessToken')
                if (accessToken) return JSON.parse(accessToken)
            },
            setAccessToken: (token: string) => {
                localStorage.setItem('accessToken', JSON.stringify(token))
            },
            removeAccessToken: () => {
                localStorage.removeItem('accessToken')
            }
        },
        refreshToken: {
            getRefreshToken: () => {
                const refreshToken = localStorage.getItem('refreshToken')
                if (refreshToken) return JSON.parse(refreshToken)
            },
            setRefreshToken: (token: string) => {
                localStorage.setItem('refreshToken', JSON.stringify(token))
            },
            removeRefreshToken: () => {
                localStorage.removeItem('refreshToken')
            }
        }
    },
    loginRequestData: {
        getLoginRequestData: () => {
            const loginRequestData = localStorage.getItem('loginRequestData')
            if (loginRequestData) {
                return JSON.parse(loginRequestData)
            }
            return { username: '', password: '' }
        },
        setLoginRequestData: (loginRequestData: LoginRequest) => {
            localStorage.setItem('loginRequestData', JSON.stringify(loginRequestData))
        },
        removeLoginRequestData: () => {
            localStorage.removeItem('loginRequestData')
        }
    }
}