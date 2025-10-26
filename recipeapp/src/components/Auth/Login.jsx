import axios from "axios";
import { useState , useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message , setMessage] = useState("");
  const navigate = useNavigate()
  const {setUsername} = useContext(UserContext)

  //axios.defaults.withCredentials = true 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", {
        username:name,
        password
      },{withCredentials:true})
      .then(result=> {
        window.localStorage.setItem("userId",result.data.id)
        window.localStorage.setItem("username",result.data.username)
        setUsername(result.data.username)
        navigate("/")
      })
      .catch(err=>{
        setMessage(err.response.data.message)
      })

    setName("")
    setPassword("")
  };

  return (
    <div className="bg-gray-200 h-screen w-full flex items-center justify-center z-20">
      <form onSubmit={handleSubmit} className="bg-white p-9 rounded-lg w-[440px]">
        <h1 className="uppercase text-5xl font-bold text-center mb-6 text-blue-500">
          login
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="capitalize font-medium text-xl">
            username:
          </label>
          <input
            className="text-lg border-2 p-3 "
            type="text"
            id="username"
            placeholder="enter username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="capitalize font-medium text-xl">
            password:
          </label>
          <input
            className="text-lg border-2 p-3 "
            type="password"
            id="password"
            placeholder="enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <p className="text-sm text-red-500 capitalize">{message}</p>
        <button
          className="bg-green-600 text-xl text-white p-3.5 rounded-2xl uppercase font-semibold mt-4 w-full"
          type="submit"
        >
          login
        </button>
        <Link to="/auth/register">
            <button
            className="bg-white text-xl text-black p-3.5 rounded-2xl uppercase font-semibold mt-4 w-full border-2 border-black"
            >
            register
            </button>
        </Link>
      </form>
    </div>
  );
}

export default Login