import { TbError404 } from "react-icons/tb";
import { PiSmileySadDuotone } from "react-icons/pi";
const PageNotFound = () => {
    return (
        <div className=" flex flex-col items-center justify-center h-screen">
            <PiSmileySadDuotone
                className="text-9xl"
            />
            <TbError404
                className="text-8xl"
            />
            <p>The page you're looking for doesn't exist.</p>
        </div>
    )
}

export default PageNotFound