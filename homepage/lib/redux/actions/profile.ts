import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFetched } from '../slices/FolderSlice';


export const getUserId = createAsyncThunk(
    'user/getuserId',
    async (profile: any, { dispatch, rejectWithValue }) => {
        try {
            alert("sending request")
            const macAddress = fetchMacAddress();
            const response = await fetch(`https://cloudzee.vercel.app/server/users/getUserDetails?email=${profile.email}&mac=${macAddress}`, {
                method: "GET"
            })
            if (!response.ok) {
                alert("no response")
                throw new Error('Failed to fetch data from server nope nope');
            }
            const data = await response.json()
            console.log(data)
            if (!data.success) {
                throw new Error('Error occured on server side');
            }
            console.log(data)
            dispatch(updateFetched(data.data.home))
            return data;

        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
);

const fetchMacAddress = async () => {
    try {
        const response = await fetch('https://cloudzee.vercel.app/server/MacAddress', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            return { address: data.macAddress, success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.error };
        }
    } catch (error) {
        return { success: false, error: error };
    }
};