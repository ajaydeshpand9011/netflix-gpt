import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../utils/firebase";

import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened. navigate("/error");
      });
  };

  return (
    <div className="absolute w-full flex justify-between px-8 py-2 bg-linear-to-b from-black to-transparent z-10">
      <img
        className="w-48"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-02-12/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
      />
      <div className="flex items-center gap-4 cursor-pointer group">
        
        {user && (
            <>
                {/* Avatar */}
                <div className="w-8 h-8 rounded-md overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={user?.photoURL}
                        alt="user"
                    />
                </div>
            
                {/* Name / Action */}
                <button
                    onClick={handleSignOut}
                    className="text-md font-bold text-gray-300 group-hover:text-white transition cursor-pointer"
                >
                    Sign Out
                </button>
            </>
        )}
      </div>
    </div>
  );
};
export default Header;
