import { apiClient, urls } from ".."

export const getAllUsersApi = async () => {
    const res = await apiClient.get(urls.user.getAllUsers())
    return res
}

export const getSingleUserApi = async (userId: string) => {
    const res = await apiClient.get(urls.user.getSingleUser(userId))
    return res
}