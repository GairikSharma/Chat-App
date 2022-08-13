import { async } from '@firebase/util'
import React, { useState, useRef } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'
import auth from './firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './chat.css'


function SendMessage() {
    // const end = useRef()
    const [msg, setMsg] = useState('')
    async function sendMessage(e) {
        if (msg==='') {
            console.log('enter some text');
        } else {
            e.preventDefault()
            const { uid, photoURL, displayName } = auth.currentUser
            const collectionRef = collection(db, 'messages');
            const payload = {
                text: msg,
                uid,
                photoURL,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                displayName
            }
            console.log(payload);
            await addDoc(collectionRef, payload)
            setMsg('')
        }
        
    }
    return (
        <>
            <div>
                <form onSubmit={sendMessage}>
                    
                        <input type="text" value={msg} placeholder='Send message...' onChange={(e) => {
                            setMsg(e.target.value)
                        }} />
                        <button type='submit' className='send-button'>
                            <p>send</p>
                        </button>
                    
                </form>
            </div>
        </>
    )
}

export default SendMessage