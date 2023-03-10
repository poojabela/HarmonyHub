import { useEffect, useState, useRef } from "react";
import { collection, getDocs, setDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { app, db } from "../firebase/firebase";
import { useUser } from "../firebase/AuthContextProvider";
import { playTrack, pauseTrack, toggleMute, previousTrack, nextTrack } from "./AudioControl";

const Tracks = () => {

  const {user} = useUser()
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = tracks[currentTrackIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef();

  const handlePlay = () => playTrack(audioRef, setIsPlaying);
  const handlePause = () => pauseTrack(audioRef, setIsPlaying);
  const handleToggleMute = () => toggleMute(audioRef, isMuted, setIsMuted);
  const handlePreviousTrack = () => previousTrack(currentTrackIndex, setCurrentTrackIndex, tracks);
  const handleNextTrack = () => nextTrack(currentTrackIndex, setCurrentTrackIndex, tracks);

  const handleFav = async (track) => {
    try {
      const userDocRef = doc(getFirestore(app), `users/${user.uid}`);

      const userDocSnapshot = await getDoc(userDocRef);
      const currentFavSongs = userDocSnapshot.data().favSongs || [];

      if(!currentFavSongs.find((song) => song.id === currentTrack.id)) {
        const updatedFavSongs = [...currentFavSongs, track];
        await setDoc( userDocRef, { favSongs: updatedFavSongs });
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getTracks = async () => {
      try {
        const data = await getDocs(collection(getFirestore(app), "tracks"));
        const newTracks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setTracks(newTracks)
      } catch (error) {
        console.log(error);
      }
    };
    getTracks();
  }, []);


  useEffect(() => {
    if (currentTrack && isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);


  return (
    <div className="h-[70vh] flex flex-col justify-end items-center py-2">
      <h1 className="mb-5 text-4xl bg-[linear-gradient(-33deg,_#00008B_5%,_#ADD8E6)] bg-clip-text text-transparent">{currentTrack?.name}</h1>

      <audio
        ref={audioRef}
        src={currentTrack?.url}
      />

      <div className="cotrols flex gap-8">
          <button onClick={ handlePreviousTrack }>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-skip-back stroke-green-500 hover:stroke-green-700"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>        
          </button>
          <button onClick={ isPlaying ? handlePause : handlePlay }>
            {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pause stroke-green-500 hover:stroke-green-700"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play stroke-green-500 hover:stroke-green-700"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>}
          </button>
          <button onClick={ handleNextTrack }>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-skip-forward stroke-green-500 hover:stroke-green-700"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </button>
          <button onClick={ handleToggleMute }>
            {isMuted ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-volume-x stroke-green-500 hover:stroke-green-700"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-volume stroke-green-500 hover:stroke-green-700"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>}
          </button>
          <button onClick={() => handleFav(currentTrack)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart stroke-green-500 hover:stroke-green-700"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
      </div>
      </div>
  );
};

export default Tracks;
