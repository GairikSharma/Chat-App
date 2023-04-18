import React, { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import { collection } from "firebase/firestore";
import { orderBy, query, onSnapshot } from "firebase/firestore";
import auth from "./firebase";
import SendMessage from "./sendmsg";
import SignOut from "./signOut";
import "./chat.css";
import { deleteMessage } from "./sendmsg";
import { AiOutlineClose } from "react-icons/ai";

// import { storage } from "./firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

function Chat(props) {
  // console.log(props.imageHandler);

  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const { photoURL } = auth.currentUser;
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
  }, []);
  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  // const [signout, setSignout] = useState(false);
  // const showSignout = () => {
  //   setSignout(true);
  //   console.log("clicked");
  // };
  // const closeSignout = () => {
  //   setSignout(false);
  // };
  const currentUserName = auth.currentUser.displayName;

  // const [file, setFile] = useState(null);
  // const fileUpload = (e) => {
  //   e.preventDefault();
  //   if (file === null) return;

  //   const imageRef = ref(storage, `images/${file.name + v4()}`);
  //   uploadBytes(imageRef, file).then(() => {
  //     alert("Image Uploaded");
  //   });
  // };
  // const imageListRef = ref(storage, "images/");
  // const [imglist, setImglist] = useState([]);
  // useEffect(() => {
  //   listAll(imageListRef).then((res) => {
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImglist((prev) => [...prev, url]);
  //         console.log(url);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <>
      <div className="app-wrapper">
        <div className="app">
          <nav>
            <div className="logo">
              <div>
                <span style={{ color: "black" }}>C</span>hat
                <span style={{ color: "black" }}>X</span>
              </div>
            </div>

            <div className="profile-signout-btn">
              <div className="nav-profile">
                <img
                  src={auth.currentUser.photoURL}
                  alt=""
                  className="profile"
                  // onClick={showSignout}
                />
              </div>
              <SignOut className="signout-btn" />
            </div>
            {/* {signout && (
              <div className="showSignOut">
                <AiOutlineClose className="close" onClick={closeSignout} />
                <img
                  src={auth.currentUser.photoURL}
                  alt=""
                  className="profile"
                  onClick={showSignout}
                />
                <h3 style={{ color: "black", textAlign: "center" }}>
                  {currentUserName}
                </h3>
                <SignOut className="signout-btn" />
              </div>
            )} */}

            {/* <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <button onClick={fileUpload}>File</button> */}
          </nav>

          <div className="container">
            {messages.map(({ id, text, photoURL, uid, displayName, time }) => {
              // console.log('g');
              // if(text == " "){
              //   alert('please enter some text')
              // }

              return (
                <div key={id} className="text-with-photo">
                  {/* {imglist.map((url) => {
                return (
                  <div className="image-wrapper">
                    <img className="send-img" src={url} alt="" />
                  </div>
                );
              })} */}
                  <div
                    className={`wraper ${
                      uid === auth.currentUser.uid && "wraper-sent"
                    }`}
                  >
                    <img src={photoURL} alt="" />
                    <div
                      key={id}
                      className={`${
                        uid === auth.currentUser.uid ? "sent" : "recived"
                      }`}
                    >
                      <div>
                        <div className="display-name">{displayName}</div>
                        <span className="text-message">{text}</span>
                      </div>
                      {/* {imglist.map((url) => {
                    return (
                      <div className="image-wrapper">
                        <img className="send-img" src={url} alt="" />
                      </div>
                    );
                  })} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={scroll} className="scroll"></div>

          <SendMessage />
        </div>
      </div>
    </>
  );
}

export default Chat;
