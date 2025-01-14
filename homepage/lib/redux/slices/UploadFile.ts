'use client'

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { fetchRecentFiles } from './recentFilesSlice'; // Import the action from the recentFilesSlice
import { UploadFile } from '../actions/File';
// Define the interface for the initial state of the file upload slice
interface FileUploadState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: FileUploadState = {
    loading: false,
    error: null,
    success: false,
};


const fileUploadSlice = createSlice({
    name: 'fileUpload',
    initialState,
    reducers: {
        resetState: (state: FileUploadState) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(UploadFile.pending, (state: FileUploadState) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(UploadFile.fulfilled, (state: FileUploadState) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(UploadFile.rejected, (state: FileUploadState, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetState } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
