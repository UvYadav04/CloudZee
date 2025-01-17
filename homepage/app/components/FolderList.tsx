import React from 'react'
import { IoFolder } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
function FolderList({ itemdata }: { itemdata: any }) {
    const getdate = (input: any) => {
        const date = new Date(input)
        return date.toString().slice(4, 15)
    }

    return (
        <ul className='w-full flex justify-start gap-7 bg-slate-200 py-[2px] cursor-pointer' key={itemdata.id} >
            <li className="px-6 py-0 text-sm text-sky-400 text-start w-10 " key={itemdata.id}><IoFolder className='mt-1' color='sky' /></li>
            <li className="px-6 py-0 text-sm text-sky-400 text-start w-32 " key={itemdata.id}>{itemdata.folder_name}</li>
            <li className="px-6 py-0 text-sm text-sky-400 text-start w-32" key={itemdata.id}>{getdate(itemdata.created_at)}</li>
            <li className="px-6 py-0 text-sm text-sky-400 text-start w-32" key={itemdata.id}>{getdate(itemdata.last_opened)}</li>
            <li className="px-6 py-0 text-sm text-sky-400 text-start w-32" key={itemdata.id}>{itemdata.size}</li>

        </ul>
    )
}



export default FolderList
