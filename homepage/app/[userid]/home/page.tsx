'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileLoadingFalse } from '@/lib/redux/slices/ProfileSlice'
import Navbar from '@/app/components/Navbar'
import { useState } from "react";
import Feedback from '@/app/features/Feedback'
import Sidebar from '@/app/components/Sidebar'
import { RootState } from '@/lib/Store'
function page({ params }: { params: any }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState<boolean>(false);
    const { profile } = useSelector((state: RootState) => state.userProfile)
    console.log(profile)
    console.log(params)
    useEffect(() => {
        dispatch(setProfileLoadingFalse())
    }, [router])
    return (
        <div className={`Homepage min-w-fit w-[100vw] min-h-fit h-[100vh] flex flex-col relative`}>
            <Navbar setFeedback={setFeedback} />
            <div className="main relative flex flex-row min-w-fit w-[100%]">
                <Sidebar />
                <div className="right w-full flex-grow">
                    {/* {currentFolder.length > 0 && (
            <div className="Folder name ps-5 mx-3 mt-4">
              {currentFolder.map((item: any, i: number) => (
                <h1 className="text-sky-400" key={fetched[item]?.id}>
                  {i === 0 ? <i>{fetched[item]?.folder_name}</i> : <i> --&gt; {fetched[item]?.folder_name}</i>}
                </h1>
              ))}
              <hr />
            </div>
          )} */}

                    <div className="folderdata">
                        Content here
                    </div>
                </div>
            </div>

            {feedback && <Feedback setFeedback={setFeedback} />}
        </div>
    )
}

export default page
