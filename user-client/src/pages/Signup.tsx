import { Link } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { usePasswordToggle } from "../hooks/togglePassword";
const Signup = () => {
    const { showPassword, handleShowPassword } = usePasswordToggle();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("clicked")
    }

    const inputElement: { type: string, name: string, placeholder: string }[] = [
        { type: "text", name: "firstname", placeholder: "First Name" },
        { type: "text", name: "lastname", placeholder: "Last Name" },
        { type: "text", name: "username", placeholder: "Username" },
        { type: "email", name: "email", placeholder: "Email" },
        { type: "password", name: "password", placeholder: "Password" },
        { type: "password", name: "confirmPassword", placeholder: "Confirm Password" }
    ]

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-50">
            <form
                className="flex flex-col border border-gray-200 p-5 rounded-lg shadow-sm bg-white "
                onSubmit={handleSubmit}
            >
                <h1 className="text-center text-2xl text-gray-800 font-semibold mb-4">Signup</h1>
                {inputElement.map(({ type, name, placeholder }) => {
                    return (
                        <label
                            htmlFor={name}
                            key={name}
                            className="relative block"
                        >
                            {placeholder}:
                            <input
                                key={name}
                                type={type === "password" ? (showPassword[name] ? "text" : "password") : type}
                                name={name}
                                className="border border-gray-400 rounded w-full my-1 px-3 py-1 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            />
                            {(name === "password" || name === "confirmPassword") && (<span onClick={() => handleShowPassword(name)}>{showPassword[name] ? <LuEye className="absolute right-2 top-1/2 translate-y-1" /> : <LuEyeClosed className="absolute right-2 top-1/2 translate-y-1" />}</span>)}
                        </label>
                    )
                })}
                <p className="text-sm text-gray-600 mt-2 mb-2">Already have an account? <Link className="text-blue-600 hover:text-blue-700 hover:underline transition-colors" to="/login">Login</Link></p>
                <button className="border py-2 border-gray-400 cursor-pointer rounded hover:bg-blue-500 hover:border-0 hover:text-white transition-colors duration-500 ease-in-out">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup