'use client'

import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Feedback from "./features/Feedback";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/Store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { RootState } from "@/lib/Store";
import { setProfile, setProfileError, setProfileLoading, setProfileLoadingFalse } from "@/lib/redux/slices/ProfileSlice";
import { getUserId } from "@/lib/redux/actions/profile";
import { useRouter } from "next/navigation";
import { getFolderwithId } from "@/lib/redux/actions/folder";


export default function Home() {
  const [timeid, setTimeid] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { profile, userloading, usererror, userId } = useSelector((state: RootState) => state.userProfile);
  const { user, isLoading, error } = useUser();


  const handleBeforeUnload = () => {
    alert("refreshign")
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Custom message is ignored in most modern browsers, but it ensures compatibility
      const message = "Are you sure you want to leave?";
      console.log(message)
      event.returnValue = message;  // For modern browsers
      return message;  // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);



  // console.log(userloading, isLoading)

  useEffect(() => {
    if (timeid) clearTimeout(timeid);
    if (!profile) {
      if (isLoading) {
        const timeoutId = setTimeout(() => router.push('/api/error'), 8000);
        setTimeid(timeoutId);
        dispatch(setProfileLoading());
      } else if (error || usererror) {
        dispatch(setProfileError(error || usererror));
        router.push('/api/error');
      } else if (!user) {
        router.push('/api/auth/login');
      } else
        dispatch(setProfile(user));
    }
    return () => {
      if (timeid) clearTimeout(timeid);
    };
  }, [user, isLoading, error, usererror]);

  useEffect(() => {
    if (profile) {
      dispatch(getUserId(profile))
        .then((data: any) => {
          router.push(`/${data.payload.userid}/home`)
        })
        .catch((error) => {
          console.log(error)
          router.push('/api/error')
        })
    }
  }, [profile]);

  if (isLoading || userloading) {
    return (
      <div className="min-h-fit h-[100vh] min-w-fit w-[100vw] flex place-content-center place-items-center absolute">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
    </>
  );
}
