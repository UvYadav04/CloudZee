import React, { useState } from 'react'

function NewFolder({ Cancel, Submit }: { Cancel: any; Submit: any }) {
    const [input, setinput] = useState<string | number | undefined>("");
    return (
        <div className='h-36 w-96 absolute top-[20%] left-[40%] bg-sky-200 p-6'>

            <div className='w-full h-full border-[1px] border-white p-2 bg-sky-100 flex flex-row justify-between flex-wrap'>

                <input type="text" className='w-[100%] h-fit px-1 mt-1' placeholder='name of folder' value={input} onChange={(e) => setinput(e.target.value)} />

                <div className="buttons w-[100%] h-fit mt-auto">

                    <button className='bg-sky-300 rounded-sm px-2 py-1 ms-full h-fit' onClick={Cancel}>Cancel</button>
                    <button className='bg-sky-300 rounded-sm px-2 py-1 ms-full h-fit float-right' onClick={() => Submit(input)}>Create Folder</button>

                </div>
            </div>
        </div>
    )
}

export default NewFolder
