import { CiHome } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { logOut } from "../redux/slices/authSlice";

interface UserData {
    message: string
    user: string
    sessionId: string
}

const Navbar = () => {
    const [darkMode, setDarkMode] = useState<string>("light");
    const [rotate, setRotate] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.currentUser as UserData | null);

    const handleLogOut = async () => {
        const result = await dispatch(logOut());

        if (logOut.fulfilled.match(result)) {
            navigate("/");
        } else {
            console.error("Logout failed", result);
        }
    };

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

                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="border border-gray-400 px-4 py-1.5 rounded-md hover:bg-green-500 hover:outline-none hover:border-gray-50 hover:text-white transition-all duration-300 ease-in-out"
                            > Login</Link>
                            <Link
                                to="/signup"
                                className="border border-gray-400 px-4 py-1.5 rounded-md hover:bg-blue-500 hover:outline-none hover:border-gray-50 hover:text-white transition-all duration-300 ease-in-out"
                            > Sign Up</Link>
                        </>
                    )}

                    {user && (
                        <div className="flex items-center justify-between gap-4">
                            <button className=" cursor-pointer px-4 py-1.5 rounded-md text-white flex items-center gap-2 bg-blue-500 hover:bg-blue-700 transition-colors duration-200 ease-in-out"> <span><IoIosCreate className="text-sm" /></span> Create Blog</button>
                            <div>{user?.user}</div>
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