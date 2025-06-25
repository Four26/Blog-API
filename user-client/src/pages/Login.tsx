import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { usePasswordToggle } from "../hooks/togglePassword";
import { logIn, setField, UserData } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

const Login = (): React.JSX.Element => {
    const { showPassword, handleShowPassword } = usePasswordToggle();
    const formData = useAppSelector((state) => state.auth.formData);
    const logInError = useAppSelector((state) => state.auth.logInError);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get('error');

    const inputElement: { type: string, name: string, placeholder: string }[] = [
        { type: "text", name: "username", placeholder: "Username" },
        { type: "password", name: "password", placeholder: "Password" },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            alert("Please fill up all the fields");
            return;
        }

        const result = await dispatch(logIn(formData));

        if (logIn.fulfilled.match(result)) {
            navigate("/user");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        dispatch(setField({ name: name as keyof UserData, value }));
    };

    const handleGoogleLogIn = (): void => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google/logIn`
    };


    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-50">
            {error && <div className="error-message text-red-500 my-10">{error}</div>}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col border border-gray-200 p-5 rounded-lg shadow-sm bg-white "
                action="">
                <h1 className="text-center text-2xl text-gray-800 font-semibold mb-4">Sign in to your Account</h1>
                <p className="text-xs  text-gray-400 text-center">Get started with signing in to your account</p>
                {logInError && (<p className="text-red-500 text-center text-sm my-2">{logInError}</p>)}
                <div className="mt-5">
                    {inputElement.map(({ type, name, placeholder }) => {
                        return (
                            <label htmlFor={name} key={name} className="relative block mb-2 ">{placeholder}
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
                </div>
                <button type="submit" className="mt-3 border py-2 border-gray-400 cursor-pointer rounded hover:bg-blue-500 hover:border-0 hover:text-white transition-colors duration-500 ease-in-out">Sign in</button>

                <div className="separator w-full flex items-center justify-center gap-3 my-5">
                    <div className="w-full border border-gray-700"></div>
                    <span className="text-gray-700">OR</span>
                    <div className="w-full border border-gray-700"></div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={handleGoogleLogIn}
                        className="w-full py-2 flex items-center justify-center gap-2 rounded border border-gray-400 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-500 ease-in-out">
                        <span><FcGoogle size={25} /></span>Sign in with Google
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">Doesn't have an account? <Link className="text-blue-600 hover:text-blue-700 hover:underline transition-colors" to="/signup">Sign Up</Link></p>

            </form>
        </div>
    )
}

export default Login;