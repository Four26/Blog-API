import dashboard from "../../public/images/dashboard.png";
import posts from "../../public/images/posts.png";
import comments from "../../public/images/comment.png";
import category from "../../public/images/category.png";
import analytics from "../../public/images/analytics.png";
import user from "../../public/images/user.png";
import settings from "../../public/images/settings.png";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

const Profile = (): React.JSX.Element => {

    const clickRoute = () => {
        console.log("clicked");
    };

    const navLinkStyle = ({ isActive }: NavLinkRenderProps) => {
        return `p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 transition-colors duration-200 ease-in-out ${isActive ? "bg-blue-300 border-l-4 border-blue-400" : "hover:bg-blue-300"}`
    }

    return (
        <div className="py-4 border-r border-gray-200">
            <div className="">
                <ul className="flex flex-col justify-between items-center gap-4">
                    <li className="w-full">
                        <NavLink
                            className={navLinkStyle}
                            to="/user/dashboard"
                        ><span><img className="w-6" src={dashboard} alt={dashboard} /></span> Dashboard</NavLink>
                    </li>
                    <li
                        className="w-full">
                        <NavLink
                            onClick={clickRoute}
                            className={navLinkStyle}
                            to="/user/posts"

                        ><span><img className="w-6" src={posts} alt={posts} /></span> Posts</NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            className={navLinkStyle}
                            to="/user/comments"
                        ><span><img className="w-6" src={comments} alt={comments} /></span> Comments</NavLink>
                    </li>
                    <li className="w-full ">
                        <NavLink
                            className={navLinkStyle}
                            to="/user/categories"
                        ><span><img className="w-6" src={category} alt={category} /></span> Categories</NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            className={navLinkStyle}
                            to="/user/analytics"
                        ><span><img className="w-6" src={analytics} alt={analytics} /></span> Analytics</NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            className={navLinkStyle}
                            to="/user/profile"
                        ><span><img className="w-6" src={user} alt={user} /></span> Profile</NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            className={navLinkStyle}
                            to="/user/settings"
                        ><span><img className="w-6" src={settings} alt={settings} /></span> Settings</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile;