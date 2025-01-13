'use client';

import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import logo from '../../public/logo/logo3.png'
import { CiCircleQuestion } from "react-icons/ci";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Userprofile from '../features/user/Userprofile';
import Privacy from '../features/privacy/Privacy';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/Store';



function navbar({ setfeedback }: any) {
    const [timeid, settimeid] = useState<string | NodeJS.Timeout>();
    const [showprofile, setshowprofile] = useState<boolean>(false);
    const [privacy, showprivacy] = useState<boolean>(false)
    const [input, setinput] = useState<HTMLInputElement>();
    const { profile, userloading, userId, HomeId } = useSelector((state: RootState) => state.userProfile)
    // console.log(profile)

    //we are gonna search if user stops for atleast 1second,
    const passtime = () => {
        const timeoutid = setTimeout(() => {
            // searchthecontent()
            // alert("searching")
        }, 1000);

        settimeid(timeoutid)
    }

    const handleinputchange = (e: ChangeEvent<HTMLInputElement>) => {
        if (timeid)
            clearTimeout(timeid)
        passtime()
        setinput(e.target)
    }
    return (
        <div className='w-[100%] px-5 bg-blue-300 flex flex-row justify-between sticky top-0 left-0 z-10'>

            <div className="logo lg:w-56 md:w-48     flex flex-row " >
                <Image className='md:w-16 w-12 cursor-pointer' src={logo} alt='logo' onClick={() => redirect('/')} />
                <Link href={'/'} className='xl:text-3xl text-2xl md:block hidden my-auto text-blue-600 font-semibold outline-none' style={{ textShadow: "2px 2px 2px orange", }}>CloudZee</Link>
                {/* {HomeId} */}
            </div>
            <input className="search sm:w-3/5 w-4/5 xl:h-10 md:h-9 h-8  my-auto rounded-full bg-white px-5" placeholder='search your files here' type="text" onChange={(e) => handleinputchange(e)} />
            <div className="right w-auto gap-5 place-content-center flex-row sm:flex hidden">
                <div className="notification  my-auto relative" >
                    <CiCircleQuestion className='lg:w-9  lg:h-9 w-8 h-8 cursor-pointer ' onClick={() => {
                        setshowprofile(false)
                        setfeedback(false)
                        showprivacy(!privacy)
                    }} />
                    {
                        privacy ? <Privacy setfeedback={setfeedback} setprivacy={showprivacy} /> : null
                    }
                </div >
                <div className="profile  xl:w-10 lg:w-9 xl:h-10 lg:h-9 w-8 h-8 rounded-full my-auto cursor-pointer relative" onClick={() => setshowprofile(!showprofile)} >

                    {
                        userloading ?
                            <span className="loader2"></span>
                            :
                            (
                                profile?.picture ? <Image src={profile?.picture} width={100} height={100} className='rounded-full' alt="userimage" /> : profile?.email?.charAt(0).toUpperCase()
                            )
                    }

                    {showprofile ? <Userprofile User={profile} setshowprofile={setshowprofile} /> : null}

                </div>

            </div >

        </div >
    )
}

export default navbar