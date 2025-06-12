const Home = () => {
    return (
        <div className="flex-1 intro-wrapper px-5 py-20 flex flex-col justify-center items-center bg-stone-200 dark:bg-dark">
            <h1
                className="text-6xl my-5 text-gray-700 text-center dark:text-gray-300 transition-colors duration-200 ease-in-out"
            >Welcome to Blog API</h1>
            <p
                className="my-4 w-[900px] text-gray-700 text-center dark:text-gray-300"
            >  This is a full-featured blog API web application where users can create and manage posts, leave comments, and interact through likes. Designed with modern development practices, this platform provides a seamless experience for sharing thoughts and engaging with content.
            </p>
        </div>
    )
}

export default Home;
