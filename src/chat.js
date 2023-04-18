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
import "./main.css";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Chat() {
  const scroll = useRef();

  const [theme, setTheme] = useState("light");
  const changeTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
    console.log(theme);
  };

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
  const [signout, setSignout] = useState(false);
  const showSignout = () => {
    setSignout(true);
    console.log("clicked");
  };
  const closeSignout = () => {
    setSignout(false);
  };
  const currentUserName = auth.currentUser.displayName;

  return (
    <>
      <nav className={theme == "light" ? "navbar-light" : "navbar-dark"}>
        {/* <div className="nav-wrapper"> */}
        <div className="logo">
          <div>
            <span
              style={theme == "light" ? { color: "black" } : { color: "white" }}
            >
              C
            </span>
            hat
            <span
              style={theme == "light" ? { color: "black" } : { color: "white" }}
            >
              X
            </span>
          </div>
        </div>

        <div className="theme-profile-signout">
          <div
            className={
              theme == "light" ? "theme-changer-light" : "theme-changer-dark"
            }
            onClick={changeTheme}
            title={
              theme == "light" ? "Change to dark mode" : "Change to light mode"
            }
          >
            <FontAwesomeIcon icon={theme == "light" ? faMoon : faSun} />
          </div>

          <img
            src={auth.currentUser.photoURL}
            alt=""
            className="profile"
            onClick={showSignout}
          />

          <div
            className={
              theme == "light"
                ? "theme-changer-light-button-signout"
                : "theme-changer-dark-button-signout"
            }
            onClick={changeTheme}
            title={
              theme == "light" ? "Change to dark mode" : "Change to light mode"
            }
          >
            <SignOut className="signout-btn" />
          </div>
          {/* </div> */}
        </div>
      </nav>
      <div className="upper-gap" style={{ height: "100px" }}></div>
      <div className={theme == "light" ? "container-light" : "container-dark"}>
        {messages.map(({ id, text, photoURL, uid, displayName, time }) => {
          return (
            <div key={id} className="text-with-photo">
              <div
                className={`wraper ${
                  uid === auth.currentUser.uid && "wraper-sent"
                } chat-wrapper`}
              >
                <img src={photoURL} alt="" />
                <div
                  key={id}
                  className={`${
                    uid === auth.currentUser.uid
                      ? theme == "light"
                        ? "sent-light"
                        : "sent-dark"
                      : theme == "light"
                      ? "received-light"
                      : "received-dark"
                  }`}
                >
                  <div>
                    <div className="display-name">{displayName}</div>
                    <p>{text}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={scroll} className="scroll"></div>
      <div className={theme == "light" ? "lower-gap-light" : "lower-gap-dark"} style={{height: "70px"}}></div>
      <SendMessage theme={theme} />
    </>
  );
}

export default Chat;
