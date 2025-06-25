import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../api/getPosts";
import { useAppSelector } from "../redux/hooks/hooks";
import { getUserPosts } from "../api/getUserPosts";

interface Post {
    id: number
    title: string
    content: string
    status: string
    created_at: number
    category_name: string
    firstname: string
    lastname: string
}

interface UserPosts {
    status: string
}


const Main = (): React.JSX.Element => {

    const [posts, setPosts] = useState<Post[]>();
    const [userPosts, setUserPosts] = useState<UserPosts[] | null>(null);
    const user = useAppSelector((state) => state.auth.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async (): Promise<void> => {
            const posts = await getPosts();
            setPosts(posts);
        }

        const fetchUserPosts = async (): Promise<void> => {
            const userPosts = await getUserPosts();
            console.log(userPosts)
            setUserPosts(userPosts);
        }

        fetchPosts();
        fetchUserPosts();
    }, []);

    const handleView = (blog: Post): void => {
        navigate(`/views/${blog.id}`, { state: blog })
    }

    return (
        <div className="flex-1 ">
            <div className="user-wrapper px-10 py-10">
                <h2 className="text-3xl mt-5 mb-2">Welcome, {user}!</h2>
                <p className="text-gray-600 mb-10">You have {userPosts?.filter((post) => post.status === "published").length} published posts and {userPosts?.filter((post) => post.status === "draft").length} draft posts.</p>
                <Link to="/myposts"
                    className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]"
                >
                    <button className="px-5 py-2">My Blogs</button>
                </Link>
            </div>

            <div className="post-wrapper px-10">
                <h2
                    className="text-4xl mt-10"
                >Recent Posts</h2>
                <div className="flex flex-wrap pb-20 pt-7 justify-center items-center overflow-y-scroll gap-5">
                    {posts?.length !== 0 ? posts?.map((post) => (
                        <div
                            key={post.id}
                            className="border border-gray-300 outline-none p-3 w-[700px] h-[300px] overflow-hidden rounded flex flex-col justify-between items-start shadow-lg dark:border-gray-700"
                        >
                            <h3
                                className="uppercase text-l text-blue-500"
                            >{post.category_name}</h3>
                            <h4
                                className="underline text-xl text-[#333333] dark:text-gray-300"
                            >{post.title}</h4>
                            <p
                                className="text-gray-500"
                            >By {post.firstname} {post.lastname} &#124; <span>{post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            }) : "Error"}</span></p>
                            <p
                                className="line-clamp-3 text-[#333333] dark:text-gray-300"
                            >{post.content}</p>
                            <button
                                onClick={() => handleView(post)}
                                className="text-blue-500 cursor-pointer text-sm hover:text-blue-600 transition-colors duration-200 ease-in-out"
                            >Read More &#8594;</button>
                        </div>
                    )) : (
                        <div>
                            <p className="capitalize">There are no recent posts.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main;