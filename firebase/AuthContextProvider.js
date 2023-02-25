import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase"

export const AuthContext = createContext(null);
export function AuthContextProvider ({children}) {
    const [user, setUser] = useState(undefined);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        return auth.onAuthStateChanged(async (newUserState) => {
            setUser(newUserState);
        })
    }, []);

    useEffect(() => {
        if (user) {
            return onSnapshot(doc(db, `users/${user.uid}`), async (snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.data());
                } else {
                    await setDoc(snapshot.ref, {
                        favSongs: []
                    })
                }
            });
        }
    }, [user]);

    return <AuthContext.Provider value={{
        user,
        data,
        isLoading: [user, data].includes(undefined)
    }}>{children}</AuthContext.Provider>
}

export function useUser() {
    return useContext(AuthContext)
}