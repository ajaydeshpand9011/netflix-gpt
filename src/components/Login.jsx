import { useState } from "react";

import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  function toggleSignInForm() {
    setIsSignInForm((prev) => !prev);
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
        <form className="flex flex-col p-12 bg-black/80 text-white rounded shadow-lg my-36 w-3/12">
          <p className="font-bold text-3xl py-4">{isSignInForm ? "Sign Up" : "Sign In"}</p>
          {isSignInForm && (
            <input
                type="text"
                className="p-4 my-4 bg-[#282828] w-full rounded shadow-sm"
                placeholder="Full Name"
                id="name"
                autoComplete="off"
            />
          )}

          <input
            type="text"
            className="p-4 my-4 bg-[#282828] w-full rounded shadow-sm"
            placeholder="Email Address"
            id="email"
            autoComplete="off"
          />
          <input
            type="password"
            className="p-4 my-4 bg-[#282828] w-full rounded shadow-sm"
            placeholder="Password"
            id="password"
            autoComplete="off"
          />
          <button className="p-4 my-4 bg-red-600 rounded w-full cursor-pointer shadow-md">
            {isSignInForm ? "Sign Up" : "Sign In"}
          </button>
          <div className="flex justify-start gap-2">
            <input className="rouded" type="checkbox" id="signIn" onClick={toggleSignInForm} />
            <p className="py-4">
                {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
