declare module 'redux-persist/lib/storage/createWebStorage' {
    type WebStorage = {
        getItem: (key: string) => Promise<string | null>;
        setItem: (key: string, value: string) => Promise<void>;
        removeItem: (key: string) => Promise<void>;
    };

    const createWebStorage: (type: 'local' | 'session') => WebStorage;
    export default createWebStorage;
}
