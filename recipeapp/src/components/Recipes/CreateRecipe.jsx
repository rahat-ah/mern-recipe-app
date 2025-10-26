import axios from 'axios';
import { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';

function CreateRecipe() {
  const [message, setMessage] = useState("")
  const [recipe,setRecipe] = useState({
    recipeName:'',
    description:'',
    ingredients:'',
    imageUrl:'',
    userId:window.localStorage.getItem("userId")
  })
  const navigate = useNavigate()

  const handleChange = (e) =>{
    const {id,value}=e.target
    setRecipe(prev=> ({...prev,[id]:value}))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const result =await axios.post("http://localhost:3000/recipe/create-recipe",recipe)
      setMessage(result.data.message)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
    navigate("/")
  }

  return (
    <div className="bg-gray-200 h-screen w-full flex items-center justify-center z-20">
      <form onSubmit={handleSubmit} className="bg-white p-9 rounded-lg w-[440px]">
        <h1 className="uppercase text-5xl font-bold text-center mb-6 text-green-500">
          create recipe
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="recipeName" className="capitalize font-medium text-xl">
            Name:
          </label>
          <input
            className="text-lg border-2 p-3 "
            type="text"
            id="recipeName"
            placeholder="enter name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="capitalize font-medium text-xl">
            description:
          </label>
          <input
            className="text-lg border-2 p-3 "
            type="text"
            id="description"
            placeholder="enter description"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="ingredients" className="capitalize font-medium text-xl">
            ingredients:
          </label>
          <input
            className="text-lg border-2 p-3 "
            type="text"
            id="ingredients"
            placeholder="enter ingerdients"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="imageUrl" className="capitalize font-medium text-xl">
            image URL:
          </label>
          <input
            className="text-lg border-2 p-3 "
            type="text"
            id="imageUrl"
            placeholder="enter URL"
            onChange={handleChange}
          />
        </div>
        <p className=" text-sm text-red-500 capitalize">{message}</p>
        <button
          className="bg-blue-600 text-xl text-white p-3.5 rounded-2xl uppercase font-semibold mt-4 w-full"
          type="submit"
        >
          Submit
        </button>
        <Link to="/recipe/saved-recipe">
          <button
            className="bg-white text-xl text-black p-3.5 rounded-2xl uppercase font-semibold mt-4 w-full border-2 border-black"
          >
            saved recipe
          </button>
        </Link>
      </form>
    </div>
  )
}

export default CreateRecipe