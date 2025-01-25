import React from 'react'

function Barbutton({ foldername, onClick }: any) {
    return (
        <button className='px-5 mx-3 py-0 text-xl text-start  text-blue-600 bg-white w-[75%] mt-5 rounded-md' style={{ boxShadow: "2px 2px 1px #93c5fd" }} onClick={onClick}>
            {foldername}
        </button>
    )
}

export default Barbutton
