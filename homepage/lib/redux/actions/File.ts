import { createAsyncThunk } from '@reduxjs/toolkit';




export const UploadFile = createAsyncThunk(
    'folder/getFolder', // Action type
    async ({ file, parentId, userId }: { file: any, parentId: string, userId: String }, { rejectWithValue }) => {
        try {
            // alert("called to homefolder")
            // Making a request to fetch folder data based on the folder name and folder ID
            // console.log(folderId, userId)
            const response = await fetch(`http://localhost:3000/server/files/uploadFile?file=${file}&parentId=${encodeURIComponent(parentId)}&userId=${userId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch folder data');
            }

            const folderData = await response.json();
            if (!folderData.success)
                throw new Error('Failed to fetch folder data');

            // console.log(folderData)
            return folderData; // Return the fetched folder data
        } catch (error: any) {
            return rejectWithValue(error.message); // Return error message if the request fails
        }
    }
);