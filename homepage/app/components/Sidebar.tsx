'use client'

import React, { useEffect, useRef, useState } from 'react'
import { VscNewFile } from "react-icons/vsc";
import Barbutton from './Barbutton';
import { useSelector, useDispatch } from 'react-redux';
import NewFolder from './NewFolder';
import { createNewFolder } from '@/lib/redux/actions/folder';
import { RootState } from '@/lib/Store';
import { UploadFile } from '@/lib/redux/actions/File';
function Sidebar() {

    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newf, setnewf] = useState<boolean>(false)
    const { currentFolder } = useSelector((state: RootState) => state.fetchFolder)
    const { userId } = useSelector((state: RootState) => state.userProfile)

    //handlebuttonclick is for clicking the input automatically when user presses new file to upload
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically trigger the file input
        }
    };

    // once file selected it will go to upload section
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file)
        }
    };

    // as soon as we have a file to uplaod we will dispatch the file upload function to upload the file to the database
    const handleFileUpload = (file: File) => {
        dispatch(UploadFile({ file: file, parentId: currentFolder[currentFolder.length - 1], userId: userId }));
    };

    //in case we create a new folder we will dispatch the new folder function
    const newfolder = async (input: String) => {
        if (input == "")
            return;
        dispatch(createNewFolder({ folderName: input, parentId: currentFolder[currentFolder.length - 1], userId: userId }))
    }

    return (
        <div className='lg:flex top-0 left-0 min-h-fit h-[91.5vh] min-w-fit w-64 bg-blue-100 py-4 flex flex-col place-items-start px-2 flex-shrink-0'>

            <button className='w-[90%] h-fit py-2 mx-auto text-3xl text-center text-blue-700 bg-white rounded-md' style={{ boxShadow: "4px 4px 2px #93c5fd" }} onClick={handleButtonClick} >
                <VscNewFile className='mb-[3px] me-3 inline' />New File</button>

            <input type="file" name='avatar' className='hidden' ref={fileInputRef} onChange={handleFileChange} />

            <Barbutton foldername={"New Folder"} onClick={() => setnewf(true)} />
            <Barbutton foldername={"Recents"} />
            <Barbutton foldername={"Favourites"} />
            <Barbutton foldername={"Important"} />
            <Barbutton foldername={"Appearance"} />

            {
                newf && <NewFolder Cancel={() => setnewf(false)} Submit={newfolder} />
            }

            <button className='w-[90%] h-fit mt-auto  text-2xl text-start px-2 text-blue-600 rounded-md' >Storage Used

                <div className='bg-blue-300 h-2 w-[90%]  mt-2'>
                    <div className={`w-[${30}%] bg-blue-600 h-2`}></div>
                </div>

                <h6 className='text-sm text-red-500'>30% of 5GB</h6>

            </button>

        </div>
    )
}

export default Sidebar
