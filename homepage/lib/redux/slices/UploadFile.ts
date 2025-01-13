'use client'

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { fetchRecentFiles } from './recentFilesSlice'; // Import the action from the recentFilesSlice

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

// Define the async action for uploading a file
export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async (file: File, { dispatch, rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/dummy', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const fileData = await response.json();

            // After a successful upload, dispatch the action to fetch the recent files
            // dis  patch(fetchRecentFiles()); // Fetch the updated list of files after successful upload
            return fileData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

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
            .addCase(uploadFile.pending, (state: FileUploadState) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(uploadFile.fulfilled, (state: FileUploadState) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(uploadFile.rejected, (state: FileUploadState, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetState } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
