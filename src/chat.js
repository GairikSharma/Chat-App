import React, { useState, useEffect, useRef } from 'react'
import { db } from './firebase'
import { collection } from 'firebase/firestore'
import { orderBy, query, onSnapshot } from 'firebase/firestore'
import auth from './firebase'
import SendMessage from './sendmsg'
import SignOut from './signOut'
import './chat.css'
import { deleteMessage } from './sendmsg'
import { AiOutlineClose } from 'react-icons/ai';


function Chat() {
  const scroll = useRef()
  const [messages, setMessages] = useState([])
  const { photoURL } = auth.currentUser
  useEffect(() => {
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("time"));
    onSnapshot(q, (doc) => {
      let arr = [];
      doc.forEach((d) => {
        arr.push(d.data());
      });
      setMessages(arr);
      // console.log("loaded man");
    });
  }, [])
  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])
  const [signout, setSignout] = useState(false)
  const showSignout = () => {
    setSignout(true)
    console.log('clicked');
  }
  const closeSignout = () => {
    setSignout(false)
  }
  const currentUserName = auth.currentUser.displayName

  return (
    <>
      <nav>
        <div className='logo'>
          <div><span style={{ color: 'black' }}>C</span>hat<span style={{ color: 'black' }}>X</span></div>
        </div>

        <img src={auth.currentUser.photoURL} alt="" className='profile' onClick={showSignout} />
        {
          signout && (
            <div className="showSignOut">
              <AiOutlineClose className='close' onClick={closeSignout} />
              <img src={auth.currentUser.photoURL} alt="" className='profile' onClick={showSignout} />
              <h3 style={{ color: 'black', textAlign: 'center' }}>{currentUserName}</h3>
              <SignOut className='signout-btn'/>
            </div>
          )
        }
      </nav>
      <div className="container">
        {
          messages.map(({ id, text, photoURL, uid, displayName, time }) => {

            return <div key={id} className='text-with-photo'>

              <div className={`wraper ${uid === auth.currentUser.uid && 'wraper-sent' }`}>
                  <img src={photoURL} alt="" />
                <div key={id} className={`${uid === auth.currentUser.uid ? 'sent' : 'recived'}`}>
                  <div>
                    <div className='display-name'>{displayName}</div>
                    <p>{text}</p>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
      <div ref={scroll} className='scroll'></div>
      <SendMessage />
      
    </>
  )
}

export default Chat