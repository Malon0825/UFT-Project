import React, {useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){

  return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState()
  const [currentUserId, setUserId] = useState()
  const [loading, setLoading] = useState(true)



  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  } 

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        // setUserId(user.uid)
        setLoading(false)
      })
      return unsubscribe
  }, [])

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      setUserId(user.uid)
    } else {
      // User not logged in or has just logged out.
    }
  });

  const value = {
    currentUserId,
    currentUser,
    login,
    logout,
    resetPassword
  }

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  )

}
