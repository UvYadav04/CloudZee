import React from 'react'
import { IoFolder } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
function FolderList({ itemdata }: { itemdata: any }) {
    console.log(itemdata)
    // if (itemdata.type === "file")
    //     return (
    //         <tr key={itemdata.id}>
    //             <td key={itemdata.id}>{itemdata.type}</td>
    //             <td key={itemdata.id}>{itemdata.folder_name}</td>
    //             <td key={itemdata.id}>{getdate(itemdata.created_at)}</td>
    //             <td key={itemdata.id}>{itemdata.last_opened}</td>
    //             <td key={itemdata.id}>{itemdata.size}</td>
    //         </tr>
    //     )
    return (
        <tr key={itemdata.id} >
            <td className="px-6 py-3 text-left text-sm text-sky-400" key={itemdata.id}><IoFolder color='sky' /></td>
            <td className="px-6 py-3 text-left text-sm text-sky-400" key={itemdata.id}>{itemdata.folder_name}</td>
            <td className="px-6 py-3 text-left text-sm text-sky-400" key={itemdata.id}>{getdate(itemdata.created_at)}</td>
            <td className="px-6 py-3 text-left text-sm text-sky-400" key={itemdata.id}>{getdate(itemdata.last_opened)}</td>
            <td className="px-6 py-3 text-left text-sm text-sky-400" key={itemdata.id}>{itemdata.size}</td>

        </tr>
    )
}

const getdate = (input: any) => {
    const date = new Date(input)
    return date.toString().slice(4, 15)
}

export default FolderList
