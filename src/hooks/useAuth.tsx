import { useRouter } from 'next/dist/client/router'
import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { auth, database, firebase } from '../services/firebase'

interface AuthProviderProps {
  children: ReactNode
}

interface IUpdateProps {
  id: string,
  currencySold: string,
  amountSpent: number,
  purchasedCurrency: string,
  valuePurchased: number
}

interface IUser {
  id: string
  name: string
  real: number
  britas: number
  bitcoins: number
}

interface ITransactionProps {
  id: string
  title: string
  currencySold: string
  amountSpent: number
  currencyPurchased: string
  valuePurchased: number
}

interface IAuthContext {
  user: IUser
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  findUserFirebase: (id: string) => Promise<void>
  transactions: any
  updateUserFirebase: ({
    id,
    currencySold,
    amountSpent,
    purchasedCurrency,
    valuePurchased
  }: IUpdateProps) => Promise<void>
  createTransactionFirebase: ({
    id,
    title,
    currencySold,
    amountSpent,
    currencyPurchased,
    valuePurchased
  }: ITransactionProps) => Promise<void>
}

const AuthContext = createContext({} as IAuthContext)

export function AuthProvider ({ children }: AuthProviderProps) {
  const route = useRouter()
  const [ user, setUser ] = useState<IUser>({} as IUser)
  const [ transactions, setTransactions ] = useState<any>({})

  async function signInWithGoogle () {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()

      const response = await auth.signInWithPopup(provider)

      if (!response.user) throw new Error('Missing information from Google Acconunt!')

      const { displayName, uid } = response.user

      if (!displayName) throw new Error('Missing \'displayName\' information from Google Acconunt!')

      const foundUser = await findUserFirebase(uid)

      if (foundUser) {
        route.push('/dashboard')
        return
      }

      await createUserFirebase(displayName, uid)
      route.push('/dashboard')

    } catch (error) {
      console.log(error)
    }
  }

  async function signOut () {
    try {
      auth.signOut()
      setUser({} as IUser)
      console.log('Signout Succesfull')
    } catch (error) {
      console.log('Signout Failed')
    }
  }

  async function findUserFirebase (id: string) {
    try {
      const dbRef = await firebase.database().ref()
      const foundUser = await dbRef.child('users').child(id).get()
      if (foundUser.exists()) {
        setUser(foundUser.val())
        return foundUser.val()
      } else {
        console.log('No data available')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function createUserFirebase (name: string, id: string) {
    const roomRef = database.ref('users').child(id)

    const newUser = {
      name,
      id,
      real: 10000000,
      britas: 0,
      bitcoins: 0,
    }
    await roomRef.set(newUser)
    setUser(newUser)
  }

  async function updateUserFirebase ({ id, currencySold, amountSpent, purchasedCurrency, valuePurchased, }: IUpdateProps){
    const userUpdate = {
      [ currencySold ]: amountSpent,
      [ purchasedCurrency ]: valuePurchased
    }
    try {
      const dbRef = await firebase.database().ref('users')
      const user = await dbRef.child(id)
      user.update(userUpdate)
    } catch (error) {
      console.error(error)
    }
  }

  async function createTransactionFirebase ({ id, title, currencySold, amountSpent, currencyPurchased, valuePurchased }: ITransactionProps) {
    const roomRef = database.ref('transactions').child(id)

    const newTransaction = {
      id,
      title,
      currencySold,
      amountSpent,
      currencyPurchased,
      valuePurchased,
      date: new Date(),
    }
    await roomRef.push(newTransaction)
    await getTransactionsFirebase(id)
  }

  async function getTransactionsFirebase (id: string) {
    try {
      const dbRef = await firebase.database().ref()
      const foundUser = await dbRef.child('transactions').child(id).get()
      if (foundUser.exists()) {
        setTransactions(foundUser.val())
      } else {
        console.log('No data transactions available')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, uid } = user

        if (!displayName) {
          throw new Error('Missing information from Google Acconunt!')
        }

        (async function () {
          await findUserFirebase(uid)
          await getTransactionsFirebase(uid)

        })()
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
      signOut,
      findUserFirebase,
      updateUserFirebase,
      createTransactionFirebase,
      transactions,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  return context
}
