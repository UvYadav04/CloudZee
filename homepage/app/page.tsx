'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/Store";
// import { persistor } from "@/lib/Store";
import { RootState } from "@/lib/Store";
import { setProfile, setProfileError, setProfileLoading } from "@/lib/redux/slices/ProfileSlice";
import { getUserId } from "@/lib/redux/actions/profile";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  //timeid store is to allow website to load for only fixed time, if not loaded page will be redirected to error page
  const [timeidstore, setTimeidStore] = useState<Array<NodeJS.Timeout>>([]);

  const { profile, userId, userloading, usererror } = useSelector((state: RootState) => state.userProfile);
  const { user, isLoading, error } = useUser();


  useEffect(() => {

    // Reset timeout and state if the component is going to unmount
    timeidstore.forEach((item) => clearTimeout(item));

    // If profile doesn't exist, check user states
    if (!profile) {
      alert("no profile")
      if (isLoading) {

        const timeoutId = setTimeout(() => {
          redirect("/api/error")
        }, 11000);

        setTimeidStore((prev) => [...prev, timeoutId]);
        dispatch(setProfileLoading());

      } else if (error || usererror) {

        console.log("error  :", error)
        console.log("usererrro r : ", usererror)
        //if usererror or error from fetching from useUser, we will redirect to error page
        dispatch(setProfileError(error || usererror));
        redirect("/api/error");

      } else if (!user) {

        //if there is no detail of user to Auth0(used for authentication purpose), then it will redirect to login
        router.push("/api/auth/login");

      } else {

        //if none of above triggers, hence we got our user wo we will set users profile in redux
        dispatch(setProfile(user));
      }
    }



    else if (!userId) {
      dispatch(getUserId(profile))
        .then((data: any) => {
          console.log(data)
          if (!data?.payload?.success) {
            throw new Error('somethign went wrong')
          }
          console.log(data)

          //if still any timeout is remaining , all will be cleared out
          timeidstore.forEach((item) => clearTimeout(item));
          console.log("moving forwAars")

          //after updating user details we will route to user's homepage
          router.push(`/${data.payload.data.userid}/home`)
        })
        .catch((error) => {
          // alert("error occured")/
          redirect("/api/error");
        });
    }
    else
      router.push(`/${userId}/home`)

    return () => {
      // Cleanup timeout on unmount or whenever dependencies change
      timeidstore.forEach((item) => clearTimeout(item));

    };
  }, [user, isLoading, error, usererror, profile, dispatch]);



  // if (isLoading || userloading) {
  return (
    <div className="min-h-fit h-[100vh] min-w-fit w-[100vw] flex place-content-center place-items-center absolute">
      <span className="loader"></span>
    </div>
  );

}
