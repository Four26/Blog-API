import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useState, useEffect } from "react";
const Navbar = () => {
    const [darkMode, setDarkMode] = useState<string>("light");
    const [rotate, setRotate] = useState<boolean>(false);


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
            <div className="navbar px-5 py-2 flex justify-between">
                <h1 className="text-2xl cursor-pointer flex items-center"><span><CiHome /></span>Blog API</h1>
                <div className="flex items-center gap-4">
                    <button className={`cursor-pointer transition-transform duration-300 ${rotate ? "rotate-180" : ""}`} onClick={toogleDarkMode}>  {darkMode === "light" ? <MdOutlineDarkMode className="text-2xl" /> : <MdOutlineLightMode className="text-2xl" />
                    }</button>

                    <Link
                        to="/login"
                        className="border px-4 rounded"
                    > Login</Link>
                    <Link
                        to="/login"
                        className="border px-4 rounded"
                    > Sign Up</Link>
                </div>
            </div >
        </>
    )
}

export default Navbar;