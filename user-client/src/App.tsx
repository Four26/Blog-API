import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/404";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
