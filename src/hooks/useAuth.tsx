import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { auth, firebase } from '../services/firebase'

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContext {
  user: IUser
  signInWithGoogle: () => Promise<void>
}

interface IUser {
  id: string
  name: string
}

const AuthContext = createContext({} as IAuthContext)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<IUser>({} as IUser)

  async function signInWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      const response = await auth.signInWithPopup(provider)
      if (response.user) {
        console.log(response)
        const { displayName, uid } = response
        if (!displayName) {
          throw new Error('Missing information from Google Acconunt!')
        }

        setUser({
          name: displayName,
          id: uid
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user) {
          const { displayName, uid } = user

          if (!displayName) {
            throw new Error('Missing information from Google Acconunt!')
          }

          setUser({
            name: displayName,
            id: uid
          })
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  return context
}
