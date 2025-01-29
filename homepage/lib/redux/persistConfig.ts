


// import { WebStorage } from "redux-persist/lib/types";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/lib/types';
export function createPersistStorage(): WebStorage {
    const isServer = typeof window === 'undefined';
    // Returns noop (dummy) storage.
    if (isServer) {
        return {
            getItem(_key: string): Promise<string | null> {
                return Promise.resolve(''); // This is fine, as it returns null in the absence of a value.
            },
            setItem(_key: string, value: string): Promise<void> {
                return Promise.resolve(); // No-op
            },
            removeItem(_key: string): Promise<void> {
                return Promise.resolve(); // No-op
            },
        };
    }
    return createWebStorage('local'); // Normal behavior for browser environment
}
