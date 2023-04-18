import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import auth from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "./chat.css";


import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


function SendMessage() {

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
  //     res.items.map((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImglist((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  
  const [msg, setMsg] = useState("");
  async function sendMessage(e) {
    if (msg === "") {
      alert("enter some text");
    } else {
      e.preventDefault();
      const { uid, photoURL, displayName } = auth.currentUser;
      const collectionRef = collection(db, "messages");
      const payload = {
        text: msg,
        uid,
        photoURL,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        displayName,
      };
      console.log(payload);
      await addDoc(collectionRef, payload);
      setMsg("");
    }
  }

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
  //     res.items.map((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImglist((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <>
      
      <div>
        <form onSubmit={sendMessage} className="send-message">
          <input
            type="text"
            value={msg}
            placeholder="Send message..."
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button type="submit" className="send-button">
            <p>send</p>
          </button>
        </form>
      </div>
    </>
  );
}

export default SendMessage;
