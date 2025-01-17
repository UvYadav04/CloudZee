'use client'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileLoadingFalse } from '@/lib/redux/slices/ProfileSlice'
import Navbar from '@/app/components/Navbar'
import { useState } from "react";
import Feedback from '@/app/features/Feedback'
import Sidebar from '@/app/components/Sidebar'
import { RootState } from '@/lib/Store'
import { getFolderwithId } from '@/lib/redux/actions/folder'
import { setHomefolder } from '@/lib/redux/slices/FolderSlice'
import FolderList from '@/app/components/FolderList'
import './page.css'
function page({ params }: { params: any }) {
  let heightref = useRef(null)
  useEffect(() => {
    if (heightref.current) {
      alert(heightref?.current?.height)
    }
  }, [])
  const router = useRouter()
  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState<boolean>(false);
  const { profile, userloading, userId, HomeId } = useSelector((state: RootState) => state.userProfile)
  const { currentFolder, fetched, loading } = useSelector((state: RootState) => state.fetchFolder)
  // console.log(userloading)
  // console.log(HomeId)
  // console.log(fetched)
  // console.log(params)
  useEffect(() => {
    dispatch(setProfileLoadingFalse())
    if (HomeId)
      dispatch(setHomefolder(HomeId))
  }, [router, HomeId])

  useEffect(() => {
    // console.log(fetched)
    if (HomeId) {
      if (fetched[HomeId] == null) {
        dispatch(getFolderwithId({ folderId: HomeId, userId: userId }))
      }
    }
  }, [fetched])

  if (userloading || loading) {
    return (
      <div className="min-h-fit h-[100vh] min-w-fit w-[100vw] flex place-content-center place-items-center absolute">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className={`Homepage min-w-fit max-w-[100vw] w-[100vw] flex flex-col `} >
      <Navbar setFeedback={setFeedback} heightref={heightref} />
      <div className="main flex flex-row min-w-fit w-[100%] max-w-[100vw]  flex-1 overflow-y-scroll" style={{ height: "inherit" }}>
        <Sidebar />
        <div className="right flex-1 flex flex-col overflow-y-scroll" style={{ height: "inherit" }} >
          {currentFolder.length > 0 && (
            <div className="Folder name ps-5 mx-3 mt-4 sticky h-10 bg-transparent">
              {currentFolder.map((item: any, i: number) => (
                <h1 className="text-sky-400" key={fetched[item]?.id}>
                  {i === 0 ? <i>{fetched[item]?.folder_name}</i> : <i> --&gt; {fetched[item]?.folder_name}</i>}
                </h1>
              ))}
              <hr />
            </div>
          )}

          <div className='w-full flex flex-col h-auto overflow-y-scroll'  >
            <ul className='h-10 flex justify-start gap-7 flex-row'>
              <li className="px-6 py-3 text-start text-sm font-medium text-sky-300 w-10" ></li>
              <li className="px-6 py-3 text-start text-sm font-medium text-sky-300 w-32" >Name</li>
              <li className="px-6 py-3 text-start text-sm font-medium text-sky-300 w-32" >Created_At</li>
              <li className="px-6 py-3 text-start text-sm font-medium text-sky-300 w-32" >Last_Modified</li>
              <li className="px-6 py-3 text-start text-sm font-medium text-sky-300 w-32 " >Size</li>
            </ul>
            <div className='overflow-y-scroll flex-1 flex flex-col justify-start gap-5' >
              {
                HomeId ?
                  fetched[HomeId].childern?.map((item: any) => {
                    return (
                      <FolderList itemdata={fetched[item]} />
                    )
                  }) : null
              }
            </div>
          </div>

        </div>
      </div>

      {feedback && <Feedback setFeedback={setFeedback} />}
    </div>
  )
}

export default page
