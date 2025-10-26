import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { UserProvider } from "./context/UserContext.jsx";
import Header from "./components/Home/Header.jsx";
import AllRecipe from "./components/Recipes/AllRecipe.jsx";
import SavedRecipe from "./components/Recipes/SavedRecipe.jsx";
import CreateRecipe from "./components/Recipes/CreateRecipe.jsx";
import ReadRecipe from "./components/Recipes/ReadRecipe.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/recipe/all-recipe" element={<AllRecipe/>}></Route>
          <Route path="/recipe/saved-recipe" element={<SavedRecipe/>}></Route>
          <Route path="/recipe/create-recipe" element={<CreateRecipe/>}></Route>
          <Route path="/recipe/read-recipe/:id" element={<ReadRecipe/>}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
