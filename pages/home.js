import FavSong from "../components/FavSong";
import Tracks from "../components/Tracks";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../firebase/AuthContextProvider";
import { useRouter } from "next/router";

const MainContainer = () => {

    const { user } = useUser()
    const Router = useRouter()

    useEffect(() => {
        if(user === null) {
            Router.push('/')
        }
    }, [])


    return ( 
        <div className="">
            <div className="video-container fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
                <video src="audio.mp4" autoPlay={true} loop={true} playsInline={true}  className="fixed h-[100vh] w-[100vw] top-0 object-cover left-0" ></video>
            </div>
            <FavSong />
            <Tracks />
        </div>
     );
}
 
export default MainContainer;