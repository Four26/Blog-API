import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/404";
import Main from "./pages/Main";
import { Authenticated } from "./pages/Authenticated";
import Home from "./pages/Home";
import CreateBlog from "./components/main/CreateBlog";
import MyBlogs from "./components/MyBlogs";
import EditBlog from "./components/main/EditBlog";
import Views from "./components/main/Views";
import { useAppDispatch } from "./redux/hooks/hooks";
import { useEffect } from "react";
import { checkAuth } from "./redux/slices/authSlice";



function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Authenticated redirectedIfAuthenticated redirectedTo="/user"><Home /></Authenticated>} />
          <Route path="/user" element={<Authenticated> <Main /></Authenticated>} />
          <Route path="/post" element={<Authenticated><CreateBlog /></Authenticated>} />
          <Route path="/myposts" element={<Authenticated><MyBlogs /></Authenticated>} />
          <Route path="/edit-blog/:id" element={<Authenticated><EditBlog /></Authenticated>} />
          <Route path="/views/:id" element={<Authenticated><Views /></Authenticated>} />


        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
