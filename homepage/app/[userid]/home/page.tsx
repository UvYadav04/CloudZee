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
import { getFolderwithId } from '@/lib/redux/actions/folder'
import { setHomefolder } from '@/lib/redux/slices/FolderSlice'
import FolderList from '@/app/components/FolderList'
function page({ params }: { params: any }) {
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
    <div className={`Homepage min-w-fit w-[100vw] min-h-fit h-[100vh] flex flex-col relative`}>
      <Navbar setFeedback={setFeedback} />
      <div className="main relative flex flex-row min-w-fit w-[100%]">
        <Sidebar />
        <div className="right w-full flex-grow">
          {currentFolder.length > 0 && (
            <div className="Folder name ps-5 mx-3 mt-4">
              {currentFolder.map((item: any, i: number) => (
                <h1 className="text-sky-400" key={fetched[item]?.id}>
                  {i === 0 ? <i>{fetched[item]?.folder_name}</i> : <i> --&gt; {fetched[item]?.folder_name}</i>}
                </h1>
              ))}
              <hr />
            </div>
          )}

          <div className="folderdata mt-4 px-5 py-2">
            <table  >
              <thead >
                <tr >
                  <th className="px-6 py-3 text-left text-sm font-medium text-sky-300" ></th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-sky-300" >Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-sky-300" >Created_At</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-sky-300" >Last_Modified</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-sky-300" >Size</th>
                </tr>
              </thead>
              <tbody>
                {
                  HomeId ?
                    fetched[HomeId].childern?.map((item: any) => {
                      return (
                        <FolderList itemdata={fetched[item]} />
                      )
                    }) : null
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {feedback && <Feedback setFeedback={setFeedback} />}
    </div>
  )
}

export default page
