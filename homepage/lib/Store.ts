import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import fileUploadReducer from '../lib/redux/slices/UploadFile';
import userProfileReducer from '../lib/redux/slices/ProfileSlice';
import folderfetchReducer from '../lib/redux/slices/FolderSlice';
import newfolderReducer from '../lib/redux/slices/NewFolder'
import { combineReducers } from 'redux';
import { createPersistStorage } from './redux/persistConfig';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage: createPersistStorage(),  // Using localStorage
    whitelist: ['fileUpload', 'userProfile', 'fetchFolder', 'newFolder'],
};

// Combine reducers
const rootReducer = combineReducers({
    fileUpload: fileUploadReducer,
    userProfile: userProfileReducer,
    fetchFolder: folderfetchReducer,
    newFolder: newfolderReducer
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with serializable check disabled for async thunks
export const store = configureStore({
    reducer: persistedReducer,
    // Disable the serializability check for thunks and persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],  // Ignore persist actions
            },
        }),
});

// Persistor
// export const persistor = persistStore(makeStore());
export const persistor = persistStore(store);

// Infer the type of the store
export type AppStore = ReturnType<typeof store.getState>;

// Infer the `RootState` and `AppDispatch` types from the store itself
// Correctly infer RootState from the store's state
export type RootState = ReturnType<typeof store.getState>;

// Correctly infer AppDispatch from the store's dispatch
export type AppDispatch = typeof store.dispatch;

