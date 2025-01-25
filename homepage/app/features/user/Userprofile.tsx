import Image from 'next/image'
import React from 'react'
import { RxCross2 } from "react-icons/rx";
function Userprofile({ User, setshowprofile }: any) {
    return (
        <div className='w-80 h-auto p-3 bg-blue-100 rounded-md absolute float-start top-10 gap-3 right-0 flex flex-col place-items-center'>

            <RxCross2 className='relative top-2 left-[45%] rounded-full bg-blue-200 text-3xl ' onClick={() => setshowprofile(false)} />

            <p>
                {User?.email}
            </p>

            <Image src={User?.picture} width={120} height={120} className='rounded-full' alt="userimage" />

            <h1>Hi!! {User?.name}</h1>

            <div className='w-[90%] h-auto bg-green-400 rounded-full text-center'>
                <div className="w-[20%] h-8 rounded-full bg-green-700">
                </div>
            </div>

            <h1>
                5% of 5GB used
            </h1>

            <a href='/api/auth/logout' className='w-[85%] text-center bg-red-500 rounded-md py-1 px-5 text-white text-xl'>
                Log Out
            </a>

        </div>
    )
}

export default Userprofile
