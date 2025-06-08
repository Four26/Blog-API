import { FaRegImage } from "react-icons/fa6";

const Post = () => {
    return (
        <div className="py-5 px-30 overflow-y-scroll">
            <div className="create-post-wrapper">
                <form className="p-3 flex flex-col shadow-md rounded-md border border-gray-300 min-h-screen">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        className="px-2 py-1 text-5xl rounded-md outline-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-10 mb-1 font-light text-lg">Featured Image</p>
                    <label
                        htmlFor="image"
                        className="border-2 border-dashed border-gray-400 w-full min-h-52 rounded-md outline-none flex flex-col items-center justify-center gap-4 cursor-pointer"
                    >
                        <span className="text-4xl"><FaRegImage /></span>
                        <span className="text-gray-500 font-semibold text-sm">Click or drag image to upload</span>
                        <span className="text-sm">Recommended size: 1200 x 630 pixels</span>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                    <label
                        htmlFor="content"
                        className="mt-10 mb-1 font-light text-lg"
                    >Blog content</label>
                    <textarea
                        name="content"
                        id="content"
                        rows={10}
                        placeholder="Write your blog here"
                        className="border border-gray-300 outline-none rounded-md resize-none p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    <label
                        htmlFor="category"
                        className="mt-10 mb-1 font-light text-xl"
                    >Category</label>
                    <select
                        name="category"
                        id="category"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Select Category" disabled>Select a Category</option>
                        <option value="option1">Technology</option>
                        <option value="option2">Lifestyle</option>
                        <option value="option3">Business</option>
                        <option value="option4">News & Updates</option>
                    </select>

                    <div className="publish-wrapper mt-10 flex items-center justify-between">
                        <label htmlFor="publish" className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input type="checkbox" name="publish" id="publish" />
                            Publish
                        </label>
                        <div className="buttons flex justify-between items-end gap-10">
                            <button className="px-6 py-1.5 text-gray-900 font-semibold text-sm border border-blue-500 hover:bg-blue-500 transition-colors duration-200 ease-in-out hover:text-white cursor-pointer rounded-md">Save</button>
                            <button className="px-6 py-1.5 text-gray-900 font-semibold text-sm border border-gray-500 hover:bg-gray-500 transition-colors duration-200 ease-in-out hover:text-white cursor-pointer rounded-md">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Post;