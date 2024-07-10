import { async } from "@firebase/util";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../firebase/firebase";
import { GoogleButton } from "react-google-button";
import { useState } from "react";

function Login() {
  const userSignIn = async (e) => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(() => {
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.errorMessage;
    });
  }

  const userSignOut = async() => {
    signOut(auth).then(() => {
      console.log("you have signed out");
    }).catch((error) => {});
  }

  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setIsVisible(false);
      setUsername(user.displayName);
      setEmail(user.email);
    }else {
      setIsVisible(true);
    }
  })

  return(
    <div className="login-page">
      <GoogleButton className="sign-in-button" onClick={userSignIn} style={{display: isVisible ? 'block' : 'none'}}/>
      <div className="info">
        <h2 style={{display: !isVisible ? 'block' : 'none'}}>Username : {username}</h2>
        <h2 style={{display: !isVisible ? 'block' : 'none'}}>Email : {email}</h2>
      </div>
      <button className="sign-out-button" onClick={userSignOut} style={{display: !isVisible ? 'block' : 'none'}}>Log out</button>
    </div>
  );
}
export default Login;