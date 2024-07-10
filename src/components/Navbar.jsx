import { Link, NavLink } from "react-router-dom";
import logo from "./../assets/logo.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../firebase/firebase";
import { useState } from "react";

function Navbar() {
  const [profilePic, setProfilePic] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setProfilePic(user.photoURL);
      setIsVisible(true);
    }else {
      setIsVisible(false);
    }
  })

  return(
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src = {logo}/>
      </Link>
      <ul>
        <li className="list">
          <NavLink to="/levels">Levels</NavLink>
        </li>
        <li className="list">
          <NavLink to="/learn">Learn</NavLink>
        </li>
        <li className="list">
          <NavLink to="/online">Online</NavLink>
        </li>
        <li className="list">
          <NavLink to="/docs">Docs</NavLink>
        </li>
        <li>
          <NavLink className="login" to="/login" style={{display: !isVisible ? 'block' : 'none'}}>Login</NavLink>
          <NavLink className="profile" to="/login" style={{display: isVisible ? 'block' : 'none'}}>
            <img className="profile-pic" src = {profilePic}/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;