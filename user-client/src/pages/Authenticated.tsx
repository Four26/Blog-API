import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";

export const Authenticated = ({ children, redirectedTo = "/login", redirectedIfAuthenticated = false }: { children: ReactNode, redirectedTo?: string, redirectedIfAuthenticated?: boolean }): React.JSX.Element => {
    const { isAuthenticated, hasCheckedAuth } = useAppSelector((state) => state.auth);

    if (!hasCheckedAuth) return <div>Loading...</div>;


    if (redirectedIfAuthenticated) return isAuthenticated ? <Navigate to={redirectedTo} replace /> : <>{children}</>

    return isAuthenticated ? <>{children}</> : <Navigate to={redirectedTo} replace />
}