import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth"
import Router from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyA1wkGhdrQTKnuT-6DClcwd5xl39gslcpg",
  authDomain: "music-1d77d.firebaseapp.com",
  projectId: "music-1d77d",
  storageBucket: "music-1d77d.appspot.com",
  messagingSenderId: "898994235845",
  appId: "1:898994235845:web:a6ce471ac3ed83f2b303ac"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider();

export const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        if(user){
            Router.push('/home')
        }
    }).catch((error) => {
        console.log(error)
    });
}

export const logOut = () => {
    signOut(auth).then(() => {
        Router.push('/')
      }).catch((error) => {
        console.log(error)
      });
}
