import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { TbMessageDots } from "react-icons/tb";
import { getComments } from "../../api/getComments";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { postComment, setTextArea } from "../../redux/slices/postCommentSlice";

interface BlogData {
    title: string
    content: string
    category: {
        name: string
    }
}

interface Comments {
    id: number
    comments: string
    created_at: number
    users: {
        firstname: string
        lastname: string
    }
}

const Views = () => {

    const [view, setView] = useState<BlogData | null>(null);
    const [comments, setComments] = useState<Comments[] | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const commentText = useAppSelector((state) => state.postComment.commentData.comment);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const viewLocation = location.state;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaValue = e.target.value;
        dispatch(setTextArea(textareaValue));
    }

    const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await dispatch(postComment({ id: viewLocation.id, comment: commentText.trim() }));

        if (postComment.fulfilled.match(result)) {
            dispatch(setTextArea(""));
            setSuccessMessage(result.payload.message);
            const updatedComments = await getComments(viewLocation.id);
            setComments(updatedComments);

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        }
    }

    useEffect(() => {
        setView(viewLocation);

        const fetchComments = async () => {
            const data = await getComments(viewLocation.id);
            setComments(data);
        };

        fetchComments();
    }, [viewLocation]);

    return (
        <div className="flex-1">
            <div className="py-5 px-30">
                <Link to="/user" className="cursor-pointer text-blue-500 hover:text-blue-700">Back to home &#8592;</Link>
                {successMessage && (
                    <p className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">{successMessage}</p>
                )}
                {view && (
                    <div className="p-5 mt-5 bg-white rounded w-full dark:bg-dark dark:border dark:border-gray-600">
                        <h1 className="text-blue-500 uppercase">{view.category.name}</h1>
                        <h2 className="mt-10 mb-5 text-2xl">{view.title}</h2>
                        <div className="leading-relaxed">{view.content.split("\n").map((paragraph, index) => paragraph.trim() && (
                            <p
                                key={index}
                                className="mb-4"
                            >
                                {paragraph}
                            </p>
                        ))}</div>
                    </div>
                )}
                <div className="comment-wrapper p-5 mt-20 bg-white rounded dark:bg-dark dark:border dark:border-gray-600">
                    <form
                        onSubmit={handlePostComment}
                        className="post-comment pb-5 border-b border-gray-400">
                        <div className="flex items-center justify-start">
                            <TbMessageDots className="text-2xl" />
                            <h1 className="text-xl">Comments</h1>
                        </div>
                        <p className="mt-5 mb-2">Share your thoughts</p>
                        <textarea
                            name="comment"
                            id="comment"
                            rows={5}
                            placeholder="Write a comment..."
                            maxLength={5000}
                            value={commentText}
                            onChange={handleChange}
                            className="w-full border border-black p-2 rounded resize-none dark:border dark:border-gray-600 outline-0 focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <div className="btn-con mt-5 flex justify-between items-center">
                            <p>0/5000 characters</p>
                            <button type="submit" className="px-5 py-1 cursor-pointer rounded border-0 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 ease-in-out">Post comment</button>
                        </div>
                    </form>

                    <div className="previous-comments mt-10 max-h-[500px] overflow-y-scroll">
                        <h1>Previous Comments</h1>
                        {comments && comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="mt-5 flex justify-center items-start gap-5 "
                            >
                                <div className="comment-profile py-2 px-3 bg-amber-300 rounded-full">
                                    <p
                                        className="dark:text-black">{comment.users.firstname.charAt(0).toUpperCase()}{comment.users.lastname.charAt(0).toUpperCase()}
                                    </p>
                                </div>
                                <div className="comment w-full p-2 bg-gray-100 rounded">
                                    <p className="font-semibold dark:text-black">{comment.users.firstname} {comment.users.lastname}
                                    </p>
                                    <p className="text-gray-600 text-sm">{comment.comments}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Views;