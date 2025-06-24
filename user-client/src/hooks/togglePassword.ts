import { useState } from "react";

export const usePasswordToggle = (): { showPassword: Record<string, boolean>; handleShowPassword: (name: string) => void; } => {
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
        password: false,
        confirmPassword: false
    });

    const handleShowPassword = (name: string): void => {
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

