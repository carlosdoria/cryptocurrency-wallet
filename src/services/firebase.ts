import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_STORAGE_BUCKET),
  messagingSenderId: String(process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID),
  appId: String(process.env.NEXT_PUBLIC_APP_ID),
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}
const auth = firebase.auth()
const database = firebase.database()

export {
  firebase,
  auth,
  database
}
