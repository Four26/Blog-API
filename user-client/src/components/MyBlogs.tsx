import { useEffect, useState } from "react";
import { userBlogs } from "../api/userBlogs";

interface Blog {
    id: number
    title: string
    category: {
        name: string
    }
    status: string
    content: string
    created_at: number
}

const MyBlogs = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [viewMode, setViewMode] = useState<string>("grid")
    const [activeTab, setActiveTab] = useState<string>("all");

    useEffect(() => {
        const fetchUserBlogs = async () => {
            const data = await userBlogs();
            console.log(data)
            setBlogs(data);
        }
        fetchUserBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        if (activeTab === "draft") return blog.status === "draft";
        if (activeTab === "published") return blog.status === "published";
        return true
    });

    const draftBlogs = blogs.filter((blog) => blog.status === "draft").length;
    const publishedBlogs = blogs.filter((blog) => blog.status === "published").length;


    const GridView = () => (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-4 ">
            {filteredBlogs.map((blog) => (
                <div
                    key={blog.id}
                    className="border border-gray-400 p-3 rounded"
                >
                    <div className="flex justify-between items-center">
                        <h1>{blog.category.name}</h1>

                        <p
                            className={blog.status === "published" ? "text-green-800 bg-green-300 rounded-full px-2 py-1 text-xs" : "text-yellow-800 bg-yellow-300 rounded-full px-2 py-1 text-xs"}
                        >{blog.status === "published" ? "Published" : "Draft"}</p>
                    </div>
                    <p className="mt-2 font-semibold text-xl truncate">{blog.title}</p>
                    <p className="text-gray-500">{new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}</p>
                    <p className="line-clamp-2 my-2">{blog.content}</p>

                    <div className="flex justify-between items-center mt-4 border-t border-gray-400 pt-2">
                        <div className="flex justify-between items-center gap-2">
                            <button className="cursor-pointer text-blue-500 hover:text-blue-700 text-sm px-2 transition-colors duration-200 ease-in-out">Edit</button>
                            <button className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm px-2 transition-colors duration-200 ease-in-out">View</button>
                        </div>

                        <div>
                            <button className="cursor-pointer text-red-500 hover:text-red-700 text-sm px-2 transition-colors duration-200 ease-in-out">Delete</button>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )

    const TableView = () => (
        <div className="mt-10 overflow-y-scroll h-[300px]">
            <table className="w-full ">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left font-normal uppercase tracking-normal">Title</th>
                        <th className="px-6 py-3 text-left font-normal uppercase tracking-normal">Category</th>
                        <th className="px-6 py-3 text-left font-normal uppercase tracking-normal">Status</th>
                        <th className="px-6 py-3 text-left font-normal uppercase tracking-normal">Date</th>
                        <th className="px-6 py-3 text-left font-normal uppercase tracking-normal">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                    {filteredBlogs.map((blog) => (
                        <tr>
                            <td className="px-6 py-1 text-sm">
                                {blog.title}
                            </td>
                            <td className="px-6 py-1 text-sm">
                                <span className="text-blue-500">
                                    {blog.category.name}

                                </span>
                            </td>
                            <td className="px-6 py-1 text-sm">
                                <span className={` ${blog.status === "published" ? "text-green-800 bg-green-300 rounded-full px-2 py-1 text-xs" : "text-yellow-800 bg-yellow-300 rounded-full px-2 py-1 text-xs"}`}>
                                    {blog.status === "published" ? "Published" : "Draft"}
                                </span>
                            </td>
                            <td className="px-6 py-1 text-sm">
                                {new Date(blog.created_at).toLocaleDateString("en-Us", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </td>
                            <td className="px-6 py-1 text-sm">
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                    <button className="text-gray-600 hover:text-gray-900">View</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    return (
        <div className="flex-1">
            <div className="p-10">
                <div className="title flex items-center justify-between">
                    <h1 className="text-2xl">My Posts</h1>

                    <div className="view">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`cursor-pointer px-3 py-1 rounded-l-md ${viewMode === "grid" ? "bg-sky-500 text-white" : "bg-white text-gray-500"} active:ring-2 active:ring-sky-500`}>Grid</button>
                        <button
                            onClick={() => setViewMode("table")}
                            className={`cursor-pointer px-3 py-1 rounded-r-md ${viewMode === "table" ? "bg-sky-500 text-white" : "bg-white text-gray-500"} active:ring-2 active:ring-sky-500`}>Table</button>
                    </div>
                </div>

                <div>
                    <div className="filter-tab py-2 mt-10 flex justify-start items-center gap-5 border-b border-gray-400">
                        <button
                            onClick={() => setActiveTab("all")}
                            className="cursor-pointer">All Posts ({blogs.length})</button>
                        <button
                            onClick={() => setActiveTab("draft")}
                            className="cursor-pointer">Draft({draftBlogs})</button>
                        <button
                            onClick={() => setActiveTab("published")}
                            className="cursor-pointer">Published ({publishedBlogs})</button>
                    </div>
                    <div>
                        {filteredBlogs.length === 0 ? (
                            <div>
                                <p>No posts found</p>
                            </div>
                        ) : (
                            viewMode === "grid" ? <GridView /> : <TableView />
                        )}
                    </div>
                </div>

                <div>
                </div>
            </div>
        </div>
    )
}

export default MyBlogs;
