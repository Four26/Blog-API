import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks/hooks";
import { checkAuth } from "../redux/slices/authSlice";

export const Authenticated = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const verifyAuth = async () => {
            const resultAction = await dispatch(checkAuth());

            if (checkAuth.fulfilled.match(resultAction)) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };
        verifyAuth();
    }, [dispatch]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" replace />

}