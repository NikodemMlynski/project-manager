import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const {user, isLoading} = useAuth();

    if(isLoading) return <p>Ładowanie</p>

    return user ? <Outlet/> : <Navigate to="/signin" replace/>;
}