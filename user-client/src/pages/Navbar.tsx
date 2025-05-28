import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks/hooks";
const Navbar = () => {
    const [darkMode, setDarkMode] = useState<string>("light");
    const [rotate, setRotate] = useState<boolean>(false);

    const user = useAppSelector(state => state.logIn.formData);
    console.log(user);

    const toogleDarkMode = () => {
        setRotate(!rotate);
        setDarkMode((prev) => (prev === "light" ? "dark" : "light"))
    }
    useEffect(() => {
        document.body.classList.add(darkMode);
        return () => document.body.classList.remove(darkMode);
    }, [darkMode]);

    return (
        <>
            <div className="navbar px-5 py-4 flex justify-between shadow">
                <h1 className="text-3xl cursor-pointer flex items-center font-semibold"><span><CiHome /></span>Blog API</h1>
                <div className="flex items-center gap-4">
                    <button className={`cursor-pointer transition-transform duration-300 ${rotate ? "rotate-180" : ""}`} onClick={toogleDarkMode}>  {darkMode === "light" ? <MdOutlineDarkMode className="text-2xl" /> : <MdOutlineLightMode className="text-2xl" />
                    }</button>

                    <Link
                        to="/login"
                        className="border border-gray-400 px-4 py-1.5 rounded-md hover:bg-green-500 hover:outline-none hover:border-gray-50 hover:text-white transition-all duration-300 ease-in-out"
                    > Login</Link>
                    <Link
                        to="/signup"
                        className="border border-gray-400 px-4 py-1.5 rounded-md hover:bg-blue-500 hover:outline-none hover:border-gray-50 hover:text-white transition-all duration-300 ease-in-out"
                    > Sign Up</Link>
                </div>

                <div>
                    <div>{user.username}</div>
                    <button> <span><IoIosCreate /></span> Create Blog</button>
                </div>

            </div >
        </>
    )
}

export default Navbar;