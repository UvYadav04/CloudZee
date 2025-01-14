import { createSlice } from '@reduxjs/toolkit';

import { createNewFolder } from '../actions/folder';

interface newFolderState {
    pending: boolean,
    success: boolean,
    newfolderError: string | null,
    folder: any
}
const initialState: newFolderState = {
    pending: false,
    success: false,
    newfolderError: null,
    folder: {}

}

const NewFolder = createSlice({
    name: 'newFolder',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createNewFolder.pending, (state: newFolderState) => {
                alert("pending")
                state.pending = false;
            })
            .addCase(createNewFolder.fulfilled, (state: newFolderState, action: any) => {
                alert("fulfilled")
                console.log(action)
                state.pending = false;
                state.success = true;
                state.folder = action.payload
            })
            .addCase(createNewFolder.rejected, (state: newFolderState, action: any) => {
                alert("rejected")
                state.pending = false;
                state.newfolderError = action.payload.error;
                state.success = false;
            });
    },
    reducers: {
        resetState: (state: newFolderState) => {
            state.pending = false;
            state.newfolderError = null;
            state.success = false;
            state.folder = {}; // Reset to empty object
        },
    }
});

export const { resetState } = NewFolder.actions;
export default NewFolder.reducer;