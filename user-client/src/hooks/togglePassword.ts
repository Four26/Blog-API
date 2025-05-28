import { useState } from "react";

export const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
        password: false,
        confirmPassword: false
    });

    const handleShowPassword = (name: string) => {
        console.log('rendered')
        setShowPassword((prev) => ({
            ...prev,
            [name]: !prev[name]
        }));
    }

    return {
        showPassword,
        handleShowPassword
    }
}

