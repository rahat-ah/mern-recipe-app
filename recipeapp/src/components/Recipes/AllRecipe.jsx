import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllRecipe() {
  const [fullRecipe, setFullRecipe] = useState([]);
  const [creatorsData,setCreatorsData] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:3000/recipe/all-recipe")
      .then((result) => {
        setFullRecipe(result.data.allRecipe);
        setCreatorsData(result.data.creatorsData)
      })
      .catch((err) => console.log(err));
  }, []);

 // console.log(creatorsData)

  return (
    <>
      {fullRecipe &&
        fullRecipe.map((recipe) => {
          const creator = recipe.userId ? creatorsData.find(
            user=> user && user._id === recipe.userId
          ):null
          return(
          <li className="flex mx-20 my-5 border-2 justify-between" key={recipe._id}>
            <img
              src={recipe.imageUrl}
              alt="recipe-image"
              className="w-[50%] "
            />
            <div className="w-[50%] p-12 flex flex-col justify-between border-l-2">
              <div>
                <h2 className="text-2xl capitalize font-semibold">recipe name: {recipe.name}</h2>
                <p className="text-lg mt-4">creator name: {
                  creator?creator.username:"unknown"
                  }</p>
              </div>
              <Link to={`/recipe/read-recipe/${recipe._id}`}>
                <button className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50 mt-5 uppercase">
                  read full recipe
                </button>
              </Link>
            </div>
          </li>
          )
        })}
    </>
  );
}

export default AllRecipe;
