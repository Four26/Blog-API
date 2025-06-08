import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/404";
import Main from "./pages/Main";
import User from "./pages/User";
import { Authenticated } from "./pages/Authenticated";
import Post from "./components/main/profile/Posts";
import Dashboard from "./components/main/profile/Dashboard";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Main />} />
          <Route path="/user" element={
            <Authenticated>
              <User />
            </Authenticated>
          } >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Post />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
