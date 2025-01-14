'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/Store";
// import { persistor } from "@/lib/Store";
import { RootState } from "@/lib/Store";
import { setHomeID, setProfile, setProfileError, setProfileLoading } from "@/lib/redux/slices/ProfileSlice";
import { getUserId } from "@/lib/redux/actions/profile";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [timeidstore, setTimeidStore] = useState<Array<NodeJS.Timeout>>([]);

  const { profile, userloading, usererror } = useSelector((state: RootState) => state.userProfile);
  const { user, isLoading, error } = useUser();


  useEffect(() => {
    // Reset timeout and state if the component is going to unmount
    timeidstore.forEach((item) => clearTimeout(item));
    // If profile doesn't exist, check user states
    if (!profile) {
      if (isLoading) {
        const timeoutId = setTimeout(() => {
          // Handle timeout behavior here (if needed)
        }, 11000);
        setTimeidStore((prev) => [...prev, timeoutId]);
        dispatch(setProfileLoading());
      } else if (error || usererror) {
        dispatch(setProfileError(error || usererror));
        router.push("/api/error");
      } else if (!user) {
        router.push("/api/auth/login");
      } else {
        dispatch(setProfile(user));
      }
    }

    return () => {
      // Cleanup timeout on unmount or whenever dependencies change
      timeidstore.forEach((item) => clearTimeout(item));

    };
  }, [user, isLoading, error, usererror]);

  useEffect(() => {
    if (profile) {
      // console.log(pr ofile)
      dispatch(getUserId(profile))
        .then((data: any) => {
          timeidstore.forEach((item) => clearTimeout(item));
          router.push(`/${data.payload.userid}/home`)
        })
        .catch((error) => {
          router.push("/api/error");
        });
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
