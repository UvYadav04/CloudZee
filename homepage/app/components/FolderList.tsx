import React from 'react'
import { IoFolder } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
function FolderList({ itemdata }: { itemdata: any }) {
    const getdate = (input: any) => {
        const date = new Date(input)
        return date.toString().slice(4, 15)
    }

    return (
        // <ul className='w-full flex justify-start gap-7  py-[2px] cursor-pointer' key={itemdata.id} >
        //     <li className="px-6 py-0 text-sm text-sky-400 text-start w-10 " key={itemdata.id}><IoFolder className='mt-1' color='sky' /></li>
        //     <li className="px-6 py-0 text-sm text-sky-400 text-start w-32 font-bold" key={itemdata.id}>{itemdata.folder_name}</li>
        //     <li className="px-6 py-0 text-sm text-sky-400 text-start w-32" key={itemdata.id}>{getdate(itemdata.created_at)}</li>
        //     <li className="px-6 py-0 text-sm text-sky-400 text-start w-32" key={itemdata.id}>{getdate(itemdata.last_opened)}</li>
        //     <li className="px-6 py-0 text-sm text-sky-400 text-start w-32" key={itemdata.id}>{itemdata.size}</li>

        // </ul>
        <tr className='w-full flex justify-start cursor-pointer' key={itemdata.id} >
            <td className=" text-center  min-w-16  flex-[0.5]  items-center text-sky-400 " key={itemdata.id}><IoFolder className='mt-1 mx-auto' color='sky' /></td>
            <td className=" text-start  min-w-16  flex-1  py-0 text-sm text-sky-400 font-bold" key={itemdata.id}>{itemdata.folder_name}</td>
            {/* <td className=" text-start  min-w-16  flex-1  py-0 text-sm text-sky-400" key={itemdata.id}>{getdate(itemdata.created_at)}</td> */}
            <td className=" text-start  min-w-16  flex-1  py-0 text-sm text-sky-400" key={itemdata.id}>{getdate(itemdata.last_opened)}</td>
            {/* <td className=" text-start  min-w-16  flex-1  py-0 text-sm text-sky-400" key={itemdata.id}>{itemdata.size}</td> */}

        </tr>
    )
}



export default FolderList
