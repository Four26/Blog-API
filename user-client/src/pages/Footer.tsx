import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="p-4 border-t border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-600 text-sm">
            <a
                href="https://github.com/Four26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors duration-200"
                aria-label="GitHub Profile"
            >
                <FaGithub className="text-2xl" />
            </a>
            <p>© 2025 Made by Franklin</p>
        </div>

    )
}

export default Footer;