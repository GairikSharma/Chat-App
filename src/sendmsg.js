import { async } from '@firebase/util'
import React, { useState, useRef } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'
import auth from './firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './chat.css'
import {FaPaperPlane} from "react-icons/fa"


function SendMessage(props) {
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
            <div style={{background: "transparent"}}>
                <form onSubmit={sendMessage}>
                    
                        <input type="text" value={msg} placeholder='Send message...' onChange={(e) => {
                            setMsg(e.target.value)
                        }} className={props.theme=='light' ? 'msg-field-light' : 'msg-field-dark'} />
                        <button type='submit' className={props.theme == 'light' ? 'send-button-light' : 'send-button-dark'}>
                            <FaPaperPlane style={{fontSize: "18px"}} />
                        </button>
                    
                </form>
            </div>
        </>
    )
}

export default SendMessage