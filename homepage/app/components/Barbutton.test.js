import { screen, render } from '@testing-library/react'
import Sidebar from './Sidebar'
import StoreProvider from '../StoreProvider';
import { store } from '@/lib/Store';
import FolderList from './FolderList';
test.skip("sidebar testing", () => {
    render(
        <StoreProvider store={store}>
            <Sidebar />
        </StoreProvider>)
    const element = screen.getAllByText(/new folder/i);
    expect(element).toBeTruthy()
})

test("folder list testing", () => {
    render(< FolderList />)
    const fun = screen.getByText(/getdate/i);
    const result = fun("dfines")
    expect(result).toBe(null)
})