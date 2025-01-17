import { createAsyncThunk } from '@reduxjs/toolkit';
import { setHomefolder } from '../slices/FolderSlice';


export const getUserId = createAsyncThunk(
    'user/getuserId',
    async (profile: any, { dispatch, rejectWithValue }) => {
        try {
            // alert("requested")
            const macAddress = fetchMacAddress();
            // console.log(macAddress)
            const response = await fetch(`http://localhost:3000/server/users/getuserId?email=${profile.email}&name=${profile.name}&?mac=${macAddress}`, {
                method: "GET"
            })
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            const data = await response.json();
            if (!data.success) {
                throw new Error('Error occured on server side');
            }
            console.log(data)
            // dispatch(setHomefolder(data.homeid))
            return data;

        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
);

const fetchMacAddress = async () => {
    try {
        const response = await fetch('http://localhost:3000/server/MacAddress', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            // console.log(data)
            return { address: data.macAddress, success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.error };
        }
    } catch (error) {
        return { success: false, error: error };
    }
};