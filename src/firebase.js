import firebase from  'firebase/compat/app' 
import 'firebase/compat/auth'

const app = firebase.initializeApp({

    apiKey: "AIzaSyDQdLegCyky3SIn9QsOyPBo-LG9Zs29c8g",
    authDomain: "uft-project0-dev.firebaseapp.com",
    projectId: "uft-project0-dev",
    storageBucket: "uft-project0-dev.appspot.com",
    messagingSenderId: "79758810958",
    appId: "1:79758810958:web:56b720e927790db6b8c81f",
    measurementId: "G-LW9MVE8J80"

})

export const auth = app.auth()
export default app