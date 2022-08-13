import React from 'react'
import auth from './firebase'
import './chat.css'

function SignOut() {
  return (
    <button onClick={()=>{
        auth.signOut()
    }} className='signOut'>Sign Out</button>
  )
}

export default SignOut