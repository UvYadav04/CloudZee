// lib/redux/store.ts
'use client'

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // This uses localStorage by default
import fileUploadReducer from '../lib/redux/slices/UploadFile';
import userProfileReducer from '../lib/redux/slices/ProfileSlice';
import folderfetchReducer from '../lib/redux/slices/FolderSlice';
import { combineReducers } from 'redux';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,  // Using localStorage
    whitelist: ['userProfile', 'fetchFolder'],  // List the slices you want to persist
};

// Combine reducers
const rootReducer = combineReducers({
    fileUpload: fileUploadReducer,
    userProfile: userProfileReducer,
    fetchFolder: folderfetchReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
    });
};

// Persistor
export const persistor = persistStore(makeStore());

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
