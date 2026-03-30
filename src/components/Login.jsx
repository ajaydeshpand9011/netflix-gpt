import { useState, useRef } from "react";

import Header from "./Header";

import { checkValidData } from '../utils/validate';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';

/* Router */
import { useNavigate } from "react-router-dom";

/* Redux */
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function toggleSignInForm() {
    setIsSignInForm((prev) => !prev);
  }

  async function createUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name.current.value,
        photoURL: "https://www.w3schools.com/howto/img_avatar2.png"
      });

      await user.reload(); // ensure fresh data

      const updatedUser = auth.currentUser;

      const { uid, email, displayName, photoURL } = updatedUser;

      // ✅ MANUAL DISPATCH (IMPORTANT)
      dispatch(addUser({ uid, email, displayName, photoURL }));

      navigate("/browse");

    } catch (error) {
      setErrMessage(error.code + "-" + error.message);
    }
  }

  async function signInUser() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      const user = userCredential.user;
      console.log("User", user);

      // Clear inputs
      email.current.value = "";
      password.current.value = "";

      // Navigate once
      navigate("/browse");

    } catch (error) {
      setErrMessage(error.code + " - " + error.message);
    }
  }

  const handleButtonClick = () => {
    // Validate Form Data
    const message = checkValidData(name?.current?.value, email.current.value, password.current.value);
    setErrMessage(message);
    
    // If Error Msg
    if(message) return;

    // Sign In/Up Logic
    if(isSignInForm) {
      createUser();
    } else {
      signInUser();
    }
  }

  return (
    <div className="relative h-screen">
      <Header />
      
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7ea4545e-42d3-4ebf-82fd-0e1984dc6375/web/IN-en-20260316-TRIFECTA-perspective_789c5633-3949-4708-8e6c-8ddfd22ed696_large.jpg"
        alt="BG-Image"
      />

      <div className="relative z-10 h-full flex items-center justify-center rounded">
        <form className="flex flex-col p-12 bg-black/80 text-white rounded shadow-lg my-36 w-3/12" onSubmit={(e) => e.preventDefault()}>
          <p className="font-bold text-3xl py-4">{isSignInForm ? "Sign Up" : "Sign In"}</p>
          {isSignInForm && (
            <input
                type="text"
                className="p-4 my-4 bg-[#282828] w-full rounded shadow-sm"
                placeholder="Full Name"
                id="name"
                autoComplete="off"
                ref={name}
            />
          )}

          <input
            type="text"
            className="p-4 my-4 bg-[#282828] w-full rounded shadow-sm"
            placeholder="Email Address"
            id="email"
            autoComplete="off"
            ref={email}
          />
          <input
            type="password"
            className="p-4 my-4 bg-[#282828] w-full rounded shadow-sm"
            placeholder="Password"
            id="password"
            autoComplete="off"
            ref={password}
          />
          <p className="text-red-400 font-bold text-lg py-2">{errMessage}</p>
          <button className="p-4 my-4 bg-red-600 rounded w-full cursor-pointer shadow-md" onClick={handleButtonClick}>
            {isSignInForm ? "Sign Up" : "Sign In"}
          </button>
          <div className="flex justify-start gap-2">
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm ? "Already registered? Sign In Now" : "New to Netflix? Sign Up Now"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
