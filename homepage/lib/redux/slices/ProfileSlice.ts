import { createSlice } from '@reduxjs/toolkit';
import { getUserId } from '../actions/profile';
interface UserProfile {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    nickname: string;
    picture: string;
    sid: string;
    sub: string;
    updated_at: string;
}

interface State {
    profile: UserProfile | null,
    userloading: boolean,
    usererror: Object | null,
    userId: String | null,
    HomeId: String | null,
    Error: String | null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        userloading: false,
        usererror: null,
        userId: null,
        HomeId: null,
        Error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserId.pending, (state: State, action) => {
                state.userloading = true
            })
            .addCase(getUserId.fulfilled, (state: State, action) => {
                console.log(action.payload)
                state.userId = action.payload.data.userid
                state.HomeId = action.payload.data.homeid
            })
            .addCase(getUserId.rejected, (state: State, action: any) => {
                // alert("rejected")
                state.userloading = false;
                state.userId = null
                state.HomeId = null;
                state.Error = action.payload.error
            })
    },
    reducers: {
        setProfileLoading: (state: State) => {
            state.userloading = true;
            state.usererror = null;
        },
        setProfileLoadingFalse: (state: State) => {
            state.userloading = false;
            state.usererror = null;
        },
        setProfile: (state: State, action) => {
            state.profile = action.payload;
            // state.userloading = false;
            state.usererror = null;
        },
        setProfileError: (state: State, action) => {
            state.usererror = action.payload;
            state.userloading = false;
        },
        clearProfile: (state: State) => {
            state.userloading = false;
            state.profile = null;
            state.usererror = null;
        }
    },
});

export const { setProfile, setProfileLoading, setProfileError, clearProfile, setProfileLoadingFalse, setHomeID } = profileSlice.actions;
export default profileSlice.reducer;