import { FaArrowAltCircleRight } from "react-icons/fa";
import logo from "../../assets/recipe.png";
import { NavLink, Link ,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import axios from "axios";

function Header() {
  const { username } = useContext(UserContext);
  const [userName,setUserName] = useState("")
  const [isLogedIn,setIsLogedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setUserName(window.localStorage.getItem("username"))
    if(userName || username){
      setIsLogedIn(true)
    }else{
      setIsLogedIn(false)
    }

  },[userName , username])

  const handleLogoutBtn = () =>{
    axios.get("https://mern-recipe-app-9zd0.onrender.com/auth/logout",{ withCredentials: true })
          .then(result=> console.log(result.data.message))
          .catch(err=>console.log(err))
    window.localStorage.clear()
    setIsLogedIn(false)
    navigate("/")
  }

  return (
    <header className=" fixed top-0 left-0 w-full p-4 dark:bg-gray-100 dark:text-gray-800 z-50">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={logo} alt="Recipe Logo" className="w-16 h-16" />
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <div className="flex">
            <NavLink
              to="/"
              rel="noopener noreferrer"
              href="#"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
                  : "flex items-center px-4 -mb-1 border-b-2"
              }
            >
              Home
            </NavLink>
          </div>
          <div className="flex">
            <NavLink
              to="/recipe/all-recipe"
              rel="noopener noreferrer"
              href="#"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
                  : "flex items-center px-4 -mb-1 border-b-2"
              }
            >
              All Recipe
            </NavLink>
          </div>
          <div className="flex">
            <NavLink
              to="/recipe/saved-recipe"
              rel="noopener noreferrer"
              href="#"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
                  : "flex items-center px-4 -mb-1 border-b-2"
              }
            >
              Saved Recipe
            </NavLink>
          </div>
          <div className="flex">
            <NavLink
              to="/recipe/create-recipe"
              rel="noopener noreferrer"
              href="#"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600"
                  : "flex items-center px-4 -mb-1 border-b-2"
              }
            >
              Create Recipe
            </NavLink>
          </div>
        </ul>
        <div className="items-center shrink-0 hidden lg:flex">
          {isLogedIn ? (
            <div className="flex items-center gap-1.5">
              <p className="text-xl capitalize ml-6">
                {username || userName && isLogedIn ? username || userName : ""}
              </p>
              {username || userName && isLogedIn ? (
                <button type="button" onClick={handleLogoutBtn}>
                  <FaArrowAltCircleRight className="text-4xl" />
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="self-center px-8 py-3 rounded">
                  Log in
                </button>
              </Link>
              <Link to="/auth/register">
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
