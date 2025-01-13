'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/Store'
import { PersistGate } from 'redux-persist/integration/react' // Import PersistGate
import { persistor } from '../lib/Store' // Import persistor

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(null)

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return (
        <Provider store={storeRef.current}>
            {/* Wrap with PersistGate to ensure the app only renders once persisted state is loaded */}
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
