import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { BlogData, createPost, setField } from "../../redux/slices/createPostSlice";


const CreateBlog = (): React.JSX.Element => {

    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const blogData = useAppSelector((state) => state.createPost.blogData);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            dispatch(setField({ name: "publish" as keyof BlogData, value: checked }));
        } else {
            dispatch(setField({ name: name as keyof BlogData, value: value }));
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const cleanedData = {
            ...blogData,
            title: blogData.title.trim(),
            content: blogData.content.trim(),
            category: blogData.category.trim()
        }
        console.log(cleanedData)
        const result = await dispatch(createPost(cleanedData));

        if (createPost.fulfilled.match(result)) {
            setSuccessMessage(result.payload.message);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        }
    }

    return (
        <div className="p-5">
            <Link to="/user" className="cursor-pointer text-blue-500 hover:text-blue-700">Back to home &#8592;</Link>
            <div className="create-post-wrapper py-3 flex justify-between items-center">
                {successMessage &&
                    (
                        <p className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">{successMessage}</p>
                    )}
                <form
                    onSubmit={handleSubmit}
                    className="p-3 w-full flex flex-col justify-between items-stretch shadow-md rounded-md border border-gray-300 min-h-screen  overflow-hidden">

                    {/* Title input */}
                    <input
                        name="title"
                        type="text"
                        placeholder="Blog Title"
                        value={blogData.title}
                        required
                        onChange={handleChange}
                        className="px-2 py-1 text-5xl rounded-md outline-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Content textarea */}
                    <label
                        htmlFor="content"
                        className="font-light text-lg flex flex-col"
                    >Blog content
                        <textarea
                            name="content"
                            id="content"
                            rows={10}
                            required
                            placeholder="Write your blog here"
                            value={blogData.content}
                            onChange={handleChange}
                            className="border border-gray-300 outline-none rounded-md resize-none p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </label>

                    {/* Category select */}
                    <label
                        htmlFor="category"
                        className="font-light text-xl"
                    >Category
                        <select
                            name="category"
                            id="category"
                            value={blogData.category}
                            required
                            onChange={handleChange}
                            className="w-full p-3 text-sm font-normal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 "
                        >
                            <option disabled className="dark:text-gray-50">Select a Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Business">Business</option>
                            <option value="News & Updates">News & Updates</option>
                        </select>
                    </label>


                    <div className="publish-wrapper flex items-center justify-between gap-5">
                        {/* Publish checkbox */}
                        <div>
                            <label htmlFor="publish" className="flex items-center gap-2 cursor-pointer text-wrap text-gray-700 dark:text-white">
                                <input
                                    type="checkbox"
                                    name="publish"
                                    id="publish"
                                    checked={blogData.publish}
                                    onChange={handleChange} />
                                Publish this blog
                            </label>
                            <span className="text-xs text-gray-700">This blog will be save as draft and only visible to you.</span>
                        </div>

                        {/* Form buttons */}
                        <div className="buttons flex justify-between items-end gap-10">
                            <button
                                type="submit"
                                className="px-6 py-1.5 text-gray-900 font-semibold text-sm border border-blue-500 hover:bg-blue-500 transition-colors duration-200 ease-in-out hover:text-white cursor-pointer rounded-md dark:text-white">Save</button>
                            <button
                                type="button"
                                className="px-6 py-1.5 text-gray-900 font-semibold text-sm border border-gray-500 hover:bg-gray-500 transition-colors duration-200 ease-in-out hover:text-white cursor-pointer rounded-md dark:text-white">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog;