import Profile from "../components/main/Profile";
import { Outlet } from "react-router-dom";

const User = () => {
    return (
        <div className="flex-1">
            <div className="grid grid-cols-[0.5fr_3fr] min-h-screen">
                <Profile />
                {/* <CreatePost /> */}
                <Outlet />
            </div>
        </div>
    )
}

export default User;