import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { usePasswordToggle } from "../hooks/togglePassword";
import { setField, signUp, UserData } from "../redux/slices/signUpSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

const Signup = () => {

    const { showPassword, handleShowPassword } = usePasswordToggle();
    const formData = useAppSelector((state) => state.signUp.formData);
    const signUpError = useAppSelector((state) => state.signUp.signUpError);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const getFieldError = (fieldName: string) => {
        if (!Array.isArray(signUpError)) return [];

        return signUpError.filter(error => error.field === fieldName).map(error => error.message);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(signUp(formData));

        if (signUp.fulfilled.match(result)) {
            navigate("/login");
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setField({ name: name as keyof UserData, value }));
    };

    const inputElement: { type: string, name: keyof UserData, placeholder: string }[] = [
        { type: "text", name: "firstname", placeholder: "First Name" },
        { type: "text", name: "lastname", placeholder: "Last Name" },
        { type: "text", name: "username", placeholder: "Username" },
        { type: "email", name: "email", placeholder: "Email" },
        { type: "password", name: "password", placeholder: "Password" },
        { type: "password", name: "confirmPassword", placeholder: "Confirm Password" }
    ];

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-50">
            <form
                className="flex flex-col border border-gray-200 p-5 rounded-lg shadow-sm bg-white w-full max-w-sm"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className="text-center text-2xl text-gray-800 font-semibold mb-4">Signup</h1>
                {inputElement.map(({ type, name, placeholder }) => {
                    const errors = getFieldError(name);
                    const hasErrors = errors.length > 0;
                    return (
                        <label
                            htmlFor={name}
                            key={name}
                            className="block text-sm"
                        >
                            {placeholder}:
                            <div className="relative">
                                <input
                                    key={name}
                                    type={type === "password" ? (showPassword[name] ? "text" : "password") : type}
                                    name={name}
                                    onChange={e => handleChange(e)}
                                    className="border border-gray-400 rounded w-full my-1 px-3 py-1 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                                {(name === "password" || name === "confirmPassword") && (
                                    <span
                                        onClick={() => handleShowPassword(name)}
                                        className="absolute right-3 top-1/2 -translate-y-1"
                                    >{showPassword[name] ?
                                        <LuEye /> :
                                        <LuEyeClosed />}
                                    </span>)}
                            </div>
                            {hasErrors && (
                                <div className="mt-1 mb-1 text-sm text-red-600">
                                    {errors.map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                                </div>
                            )}
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