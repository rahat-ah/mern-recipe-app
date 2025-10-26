import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [welcomeText, setWelcomeText] = useState("welcome to My recipe");

  axios
    .get("https://mern-recipe-app-9zd0.onrender.com/")
    .then((result) => setWelcomeText(result.data))
    .catch((err) => console.log(err));
  return (
    <>
      <h2 className="text-3xl font-bold text-center">{welcomeText}</h2>
    </>
  );
}

export default Home;
