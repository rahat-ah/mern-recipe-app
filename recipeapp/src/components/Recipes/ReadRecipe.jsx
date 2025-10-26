import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ReadRecipe() {
    const [recipe,setRecipe] = useState({})
    const [creator,setCreator] = useState({})
    const [isRecipeSaved,setIsRecipeSaved] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
      axios.get(`http://localhost:3000/recipe/read-recipe/${id}`)
          .then(result=> {
            setRecipe(result.data.fullRecipe)
            setCreator(result.data.creatorData)
          })
           .catch(err=>console.log(err))
      axios.get(`http://localhost:3000/user/userdata/${window.localStorage.getItem("userId")}`)
          .then(result=>{
            const savedRecipeList = result.data.userData.savedRecipeId
            const matchedId = savedRecipeList.includes(id)
            
            if (matchedId) {
              setIsRecipeSaved(true)
            }else{
              setIsRecipeSaved(false)
            }
          })
          .catch(err=> console.log(err))
    },[])

    const handleSaveRecipe = (recipeId) =>{
      axios.put("http://localhost:3000/recipe/save-recipe",{recipeId,userId:window.localStorage.getItem("userId")})
          .then(result=> {
            setIsRecipeSaved(true)
            console.log(result)
          })
          .catch(err=>console.log(err))
    }
    
  return (
    <div className='flex items-center justify-center pb-20'>
      <div>
        <img src={recipe.imageUrl} alt="recipe-image" className=' max-w-[900px] mb-20'/>
        <div>
            <h2 className='capitalize text-4xl mb-3'>
              recipe name:
              <span className='text-blue-600 font-bold uppercase pl-5'>
                {recipe.name}
              </span>
            </h2>
            <p className='text-lg capitalize text-gray-500 mb-10'>creator: {creator.username ? creator.username : "unkonwn"}</p>
            <p className='uppercase text-2xl mb-4'>description: <span className=' block capitalize text-xl text-green-800 mt-2'>{recipe.description}</span></p>
            <p className='uppercase text-2xl mb-10'>ingredients: <span className=' block capitalize text-xl text-green-800 mt-2'>{recipe.ingerdients}</span></p>
            <button 
              className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-500 dark:text-gray-50 capitalize mr-5"
              onClick={()=>handleSaveRecipe(recipe._id)}
              disabled={isRecipeSaved}
            >
              {!isRecipeSaved? "save recipe"
               :"already saved"
              }
            </button>
            <Link to="/recipe/all-recipe">
            <button className="self-center px-8 py-3 font-semibold rounded dark:bg-amber-600 dark:text-gray-50 capitalize">
              Back to all recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ReadRecipe