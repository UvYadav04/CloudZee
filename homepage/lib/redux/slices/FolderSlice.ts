import { createSlice } from '@reduxjs/toolkit';
import { getFolderwithId } from '../actions/folder';
// Define the interface for the initial state of the file upload slice
interface FileUploadState {
    loading: boolean;
    error: string | null;
    success: boolean;
    fetched: { [key: string]: any };  // Changed to object instead of Map
    currentFolder: Array<string>;
}

const initialState: FileUploadState = {
    loading: true,
    error: null,
    success: false,
    fetched: {},
    currentFolder: []
};


const getFolderSlice = createSlice({
    name: 'getFolder',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFolderwithId.pending, (state: FileUploadState) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getFolderwithId.fulfilled, (state: FileUploadState, action) => {
                // console.log(action)
                state.loading = true;
                state.success = true;
                state.fetched[action.payload.data.id] = action.payload.data; // Store in object
            })
            .addCase(getFolderwithId.rejected, (state: FileUploadState, action: any) => {
                state.loading = false;
                state.error = action.payload.error;
                state.success = false;
            });
    },
    reducers: {
        resetState: (state: FileUploadState) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.fetched = {}; // Reset to empty object
        },
        setHomefolder: (state: FileUploadState, action: any) => {
            state.currentFolder = [action.payload];
        }
    }
});

export const { resetState, setHomefolder } = getFolderSlice.actions;
export default getFolderSlice.reducer;