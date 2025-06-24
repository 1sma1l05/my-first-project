import { CurrentUserResponse } from "../../types/authTypes"

export type AuthState = {
    loading: boolean,
    error: string | null,
    token: {
        accessToken: string | null,
        refreshToken: string | null
    },
    currentUser: CurrentUserResponse | null
}