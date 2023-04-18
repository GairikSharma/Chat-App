import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBUnYeROLIYYc_IrNOe6Dy3M2GYTsvioi0",
    authDomain: "mychat-1993b.firebaseapp.com",
    projectId: "mychat-1993b",
    storageBucket: "mychat-1993b.appspot.com",
    messagingSenderId: "877558350589",
    appId: "1:877558350589:web:2db0c4c1e7264e1935f494",
    measurementId: "G-YBPEYE6MEG"
})

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export default auth
export {firebaseApp}
export { db, auth }
export const storage = getStorage(firebaseApp)