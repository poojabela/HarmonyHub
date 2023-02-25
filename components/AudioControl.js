export const playTrack = (audioRef, setIsPlaying) => {
  audioRef.current.play();
  setIsPlaying(true);
};

export const pauseTrack = (audioRef, setIsPlaying) => {
  audioRef.current.pause();
  setIsPlaying(false);
};

export const toggleMute = (audioRef, isMuted, setIsMuted) => {
  setIsMuted(!isMuted);
  audioRef.current.muted = !isMuted;
};

export const previousTrack = (currentTrackIndex, setCurrentTrackIndex, tracks) => {
  if (tracks && tracks.length) {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
  }
};

export const nextTrack = (currentTrackIndex, setCurrentTrackIndex, tracks) => {
  if (tracks && tracks.length) {
    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
  }
};

export const handleTimeChange = (event, setCurrentTime, audioRef) => {
  const time = parseFloat(event.target.value);
  setCurrentTime(time);
  audioRef.current.currentTime = time;
};
