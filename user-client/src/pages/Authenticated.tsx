import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";

export const Authenticated = ({ children }: { children: ReactNode }): React.JSX.Element => {
    const { isAuthenticated, hasCheckedAuth } = useAppSelector((state) => state.auth);

    if (!hasCheckedAuth) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}