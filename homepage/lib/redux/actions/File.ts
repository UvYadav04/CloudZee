import { AsyncThunkAction, createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';

export const UploadFile = createAsyncThunk(
    'fileupload', // Action type
    async ({ file, parentId, userId }: { file: any, parentId: string, userId: String }, { rejectWithValue }: any) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`http://localhost:3000/server/files/uploadFile?parentId=${encodeURIComponent(parentId)}&userId=${userId}`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to fetch folder data');
            }

            const folderData = await response.json();
            if (!folderData.success)
                throw new Error('Failed to fetch folder data');

            return folderData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);