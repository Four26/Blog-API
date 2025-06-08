import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { usePasswordToggle } from "../hooks/togglePassword";
import { logIn, setField, UserData } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
const Login = () => {
    const { showPassword, handleShowPassword } = usePasswordToggle();
    const formData = useAppSelector((state) => state.auth.formData);
    const logInError = useAppSelector((state) => state.auth.logInError);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const inputElement: { type: string, name: string, placeholder: string }[] = [
        { type: "text", name: "username", placeholder: "Username" },
        { type: "password", name: "password", placeholder: "Password" },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            alert("Please fill up all the fields");
            return;
        };

        const result = await dispatch(logIn(formData));

        if (logIn.fulfilled.match(result)) {
            navigate("/user");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setField({ name: name as keyof UserData, value }));
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col border border-gray-200 p-5 rounded-lg shadow-sm bg-white "
                action="">
                <h1 className="text-center text-2xl text-gray-800 font-semibold mb-4">Login</h1>
                {logInError && (<p className="text-red-500 text-center text-sm mb-2">{logInError}</p>)}
                {inputElement.map(({ type, name, placeholder }) => {
                    return (
                        <label htmlFor={name} key={name} className="relative block">{placeholder}:
                            <input
                                type={type === "password" ? (showPassword[name] ? "text" : "password") : type}
                                name={name}
                                onChange={handleChange}
                                className="border border-gray-400 rounded w-full my-1 px-3 py-1 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            />
                            {(name === "password") && (<span onClick={() => handleShowPassword(name)}>{showPassword[name] ? <LuEye className="absolute right-2 top-1/2 translate-y-1" /> : <LuEyeClosed className="absolute right-2 top-1/2 translate-y-1" />}</span>)}
                        </label>
                    )
                })}
                <p className="text-sm text-gray-600 mt-2 mb-2">Doesn't have an account? <Link className="text-blue-600 hover:text-blue-700 hover:underline transition-colors" to="/signup">Sign Up</Link></p>
                <button className="border py-2 border-gray-400 cursor-pointer rounded hover:bg-blue-500 hover:border-0 hover:text-white transition-colors duration-500 ease-in-out">Login</button>
            </form>
        </div>
    )
}

export default Login