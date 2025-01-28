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
import './page.css'
import FolderList from '@/app/components/FolderList'

function page({ params }: { params: any }) {

  const router = useRouter()
  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState<boolean>(false);
  const { profile, userloading, userId, HomeId } = useSelector((state: RootState) => state.userProfile)
  const { currentFolder, fetched, loading } = useSelector((state: RootState) => state.fetchFolder)

  console.log(HomeId)
  console.log(fetched)
  // alert(HomeId)
  //when this url page will open this side effect will run to turn off loading and set the home folder Id in user profile
  useEffect(() => {
    dispatch(setProfileLoadingFalse())
    if (HomeId)
      dispatch(setHomefolder(HomeId))
  }, [router, HomeId])

  //when this page starts, if we have home ID, this side effect will run to get home folder data

  useEffect(() => {
    if (HomeId) {
      if (fetched[HomeId] == null || undefined) {
        alert("fetched is null")
        dispatch(getFolderwithId({ folderId: HomeId, userId: userId }))
      }
    }
  }, [])

  //if any of the loader(userloading or loading ) we will return a loader 
  if (userloading || loading) {
    return (
      <div className="min-h-fit h-[100vh] min-w-fit w-[100vw] flex place-content-center place-items-center absolute">
        <span className="loader">hlgsdlfkgj</span>
      </div>
    );
  }

  return (
    <div className={`Homepage min-w-fit max-w-[100vw] w-[100vw] flex flex-col `} >
      <Navbar setFeedback={setFeedback} />
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

          {/* <div className='w-full flex flex-col h-auto overflow-y-scroll'  >
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
          </div> */}

          {/* <table className='w-full flex flex-col h-auto overflow-y-scroll'  >
            <thead>
              <tr className='h-10 w-full flex justify-start flex-row'>
                <td className="py-3 text-start text-sm font-medium min-w-16  text-sky-300 flex-[0.5] " ></td>
                <td className="py-3 text-start font-bold text-sm  min-w-16  text-sky-400 flex-1 " >File</td>
                <td className="py-3 text-center font-bold text-sm  min-w-16  text-sky-400 flex-1 " >Created_At</td>
                <td className="py-3 text-start font-bold text-sm  min-w-16  text-sky-400 flex-1 " >Last_Modified</td>
                <td className="py-3 text-center font-bold text-sm  min-w-16  text-sky-400 flex-1  " >Size</td>
              </tr>
            </thead>
            <tbody className='overflow-y-scroll flex-1 flex flex-col justify-start gap-2' >
              {
                HomeId ?
                  fetched[HomeId].childern?.map((item: any) => {
                    return (
                      <FolderList itemdata={fetched[item]} />
                    )
                  }) : null
              }
            </tbody>
          </table> */}

        </div>
      </div>

      {feedback && <Feedback setFeedback={setFeedback} />}
    </div>
  )
}

export default page
