import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Error({ text }) {
    return (
        <div className="flex justify-center items-center text-red-500 bg-red-100 border-1 border-red-500 rounded-sm gap-1">
            <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500" />
            <p>{text}</p>
        </div>

    )
};

export default Error;