import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFetched } from '../slices/FolderSlice';

export const getFolderwithId = createAsyncThunk(
    'folder/getFolder', // Action type
    async ({ folderId, userId }: { folderId: string, userId: String }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/server/folders/getFolder?folderId=${encodeURIComponent(folderId)}&userId=${userId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch folder data');
            }

            const folderData = await response.json();
            if (!folderData.success)
                throw new Error('Failed to fetch folder data');
            console.log(folderData)
            return folderData;
        } catch (error: any) {
            return rejectWithValue(error.message); // Return error message if the request fails
        }
    }
);

export const createNewFolder = createAsyncThunk(
    'folder/newFolder', // Action type
    async ({ folderName, parentId, userId }: { folderName: String, parentId: string, userId: String }, { dispatch, rejectWithValue }) => {
        try {
            // alert("called to homefolder")
            // Making a request to fetch folder data based on the folder name and folder ID
            // console.log(folderId, userId)
            const response = await fetch(`http://localhost:3000/server/folders/newFolder?folderName=${folderName}&parentId=${encodeURIComponent(parentId)}&userId=${userId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch folder data');
            }

            const folderData = await response.json();
            if (!folderData.success)
                throw new Error('Failed to fetch folder data');

            // console.log(folderData)
            dispatch(updateFetched(folderData.data)); // Update the fetched folder data in the stor
            return folderData; // Return the fetched folder data
        } catch (error: any) {
            return rejectWithValue(error.message); // Return error message if the request fails
        }
    }
);


