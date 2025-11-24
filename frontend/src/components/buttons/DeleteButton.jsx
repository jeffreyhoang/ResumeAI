import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function DeleteButton({ onClick }) {
    return (
        <div>
            <button onClick={onClick} className="flex items-center gap-1 text-md text-red-500 rounded-sm p-1 hover:cursor-pointer hover:bg-gray-100 hover:underline">
                <FontAwesomeIcon icon={faTrashCan} />
                <span>Delete</span>
            </button>
        </div>
    )
};

export default DeleteButton;