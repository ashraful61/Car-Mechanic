import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleAuthProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
      return signInWithPopup(auth, googleAuthProvider)

    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('carToken');
       return signOut(auth)
    }
    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe()
    }, [])

    const authInfo ={ user, loading, setLoading, createUser, login, logOut, googleLogin }
    return (
        <AuthContext.Provider value = {authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;