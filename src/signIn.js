import React, { useState, useEffect } from 'react'
import { auth } from './firebase';
import { initializeApp } from 'firebase/app'
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import './signIn.css'
import { FcGoogle } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';


function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const [showinstruction, setShowinstruction] = useState(false)
    const showInstruction = () => {
        setShowinstruction(true)
    }
    const closeInstruction = () => {
        setShowinstruction(false)
    }
    useEffect(() => {

    }, [])
    return (
        <>
            {
                showinstruction && (
                    <div className="instruction">
                        <IoIosClose className='close-instruction' onClick={closeInstruction}/>
                        <p>This chat app is under developement some feature will be added soon</p>
                    </div>
                )
            }
            <BsThreeDotsVertical className='three-dot' onClick={showInstruction}/>
            
            <div className='box'>

                <button onClick={signInWithGoogle} className='signIn'>Sign In with Google
                    <FcGoogle className='google-icon' />
                </button>

            </div>
        </>
    )
}

export default SignIn