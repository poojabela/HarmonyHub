import { signIn } from "../firebase/firebase"

const Landing = () => {
    return ( 
        <>
            <div className="video-container fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
                <video src="vinyl.mp4" autoPlay={true} loop={true} playsInline={true} muted="muted" className="fixed h-[100vh] w-[100vw] top-0 object-cover left-0"></video>
            </div>
            <div className="h-[100vh] flex flex-col justify-center items-center gap-4 text-center">
            <h1 className="text-5xl font-semibold bg-[linear-gradient(-33deg,_#00008B_5%,_#ADD8E6)] bg-clip-text text-transparent">HarmonyHub</h1>
            <p className="text-2xl text-[#808080]">Find Your Rhythm with HarmonyHub - Your Ultimate Music Destination</p> 
            <button onClick={ signIn } className="bg-[linear-gradient(-33deg,_#00008B_5%,_#ADD8E6)] px-10 py-4 rounded-full flex gap-2 text-lg text-white hover:px-12 duration-300">
                Start Listning
                <img src="favicon.png" alt="icon1" />
                </button>
            </div>
        </>
     );
}
 
export default Landing;