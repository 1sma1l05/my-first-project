import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllUsersResponse, User, UserState } from "./userTypes";
import { getAllUsers, getSingleUser } from "./userThunks";



const initialState: UserState = {
    loading: false,
    error: null,
    user: {
        users: [],
        total: null,
        skip: null,
        limit: null
    },
    userDetail: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUserDetail: (state) => {
            state.userDetail = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<GetAllUsersResponse>) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Single User
            .addCase(getSingleUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.userDetail = action.payload
            })
    }
})

export default userSlice.reducer
export const { removeUserDetail } = userSlice.actions
