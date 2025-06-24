import { Link, useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { logOut } from "../redux/slices/authSlice";
import { CiHome } from "react-icons/ci";

const Navbar = (): React.JSX.Element => {
    const [darkMode, setDarkMode] = useState<string>("light");
    const [rotate, setRotate] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.currentUser);

    const handleLogOut = async (): Promise<void> => {
        const result = await dispatch(logOut());

        if (logOut.fulfilled.match(result)) {
            navigate("/");
        } else {
            console.error("Logout failed", result);
        }
    };

    const toogleDarkMode = (): void => {
        setRotate(!rotate);
        setDarkMode((prev) => (prev === "light" ? "dark" : "light"))
    }
    useEffect(() => {
        document.body.classList.add(darkMode);
        return () => document.body.classList.remove(darkMode);
    }, [darkMode]);

    return (
        <>
            <div className="navbar px-5 py-4 flex justify-between items-center shadow">
                <Link to="/user">
                    <h1 className="sm:text-3xl cursor-pointer flex items-center font-semibold"><span><CiHome /></span>Blog API</h1>
                </Link>
                <div className="flex justify-between items-center">
                    <button className={`px-2 cursor-pointer transition-transform duration-300 ${rotate ? "rotate-180" : ""}`} onClick={toogleDarkMode}>  {darkMode === "light" ? <MdOutlineDarkMode className="text-2xl" /> : <MdOutlineLightMode className="text-2xl" />
                    }</button>

                    {!user && (
                        <div className="flex justify-between items-center gap-5">
                            <Link
                                to="/login"
                                className="border border-gray-400 px-4 py-1 rounded-md hover:bg-green-500 hover:outline-none hover:border-gray-50 hover:text-white transition-all duration-300 ease-in-out"
                            > Login</Link>
                            <Link
                                to="/signup"
                                className="border border-gray-400 px-4 py-1 rounded-md hover:bg-blue-500 hover:outline-none hover:border-gray-50 hover:text-white transition-all duration-300 ease-in-out"
                            > Sign Up</Link>
                        </div>
                    )}

                    {user && (
                        <div className="flex items-center justify-center gap-2">
                            <Link
                                to="/post"
                                className="sm:text-sm cursor-pointer px-3 py-1.5 rounded-md text-white flex items-center gap-2 bg-blue-500 hover:bg-blue-700 transition-colors duration-200 ease-in-out"> <span><IoIosCreate className="text-sm" /></span> Create Blog</Link>
                            <p>{user}</p>
                            <div
                                className="relative group cursor-pointer">
                                <FiLogOut
                                    onClick={handleLogOut}
                                    className="text-xl group-hover:text-red-500 transition-colors duration-200 ease-in-out" />
                                <div className="absolute px-4 py-2 top-full right-0 mt-1 rounded-lg bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                                    <span className="text-sm text-black">Logout</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Navbar;