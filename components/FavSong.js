import { getDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/firebase"
import { useUser } from "../firebase/AuthContextProvider";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from 'react-tooltip'

const FavSong = () => {

    const [favorites, setFavorites] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const audioRef = useRef();
    const { user, data } = useUser()

    useEffect(() => {
        if (data) {
          setFavorites(data.favSongs || []);
        }
      }, [data]);

      const handlePlay = (song) => {
        if (currentSong !== song) {
            setCurrentSong(song);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = song.url;
                audioRef.current.play();
            }
        } else {
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
    }
    
    const handlePause = () => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }
    

    const handleDeleteFav = async (id) => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          const currentFavSongs = userDocSnapshot.data().favSongs || [];
      
          const updatedFavSongs = currentFavSongs.filter(fav => fav.id !== id);
          await setDoc(userDocRef, { favSongs: updatedFavSongs });
          
          setFavorites(updatedFavSongs);
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <div className="">
            <div className="flex w-full justify-end">
                <div className="p-10">
                    <button onClick={() => setIsOpen(true)}  data-tip="Hello!" data-tooltip-id="my-tooltip" data-tooltip-content="Favorite Songs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart stroke-pink-500 fill-pink-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </div>
            <Tooltip
            id="my-tooltip"
            style={{ backgroundColor: "#ff66cc", color: "#fff"}}
            />

            {isOpen && <div className="bg-[rgba(0,0,0,0.2)] absolute z-10 top-0 left-0 w-full h-full backdrop-blur invert-0">
            <button onClick={() => setIsOpen(false)} className="flex justify-end w-full  p-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
                <div className="h-[70vh] flex flex-col justify-center items-center px-5">
                    <h1 className="mb-2 text-2xl bg-[linear-gradient(-33deg,_#00008B_5%,_#ADD8E6)] bg-clip-text text-transparent">Favorite Songs</h1>
                    <div className="flex flex-col w-[min(600px,_100%)] bg-black p-4 rounded items-center">                        {
                            favorites.map((fav) => (
                                <div key={fav?.id} className="flex w-[min(500px,_100%)] justify-between items-center py-3">
                                    <h1 className="text-xl text-[#3e3ee2]">{fav?.name}</h1>
                                    <audio
                                        ref={audioRef}
                                        src={fav?.url}
                                    />
                                    <div className="buttons flex gap-2">
                                        <button onClick={() => isPlaying && currentSong === fav ? handlePause() : handlePlay(fav)}>
                                            {isPlaying && currentSong === fav ?  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-pause stroke-green-500 hover:stroke-green-700"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play stroke-green-500 hover:stroke-green-700"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>}
                                        </button>
                                        <button onClick={() => handleDeleteFav(fav?.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 stroke-red-500 hover:stroke-red-700"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>                                        
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        {favorites.length === 0 && <div className="">Add your favorite songs</div>}
                    </div>
                </div>
            </div> }
        </div>
    );
}

export default FavSong;
