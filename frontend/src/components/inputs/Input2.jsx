import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function Input2({ label, values, isRequired=false, onAdd, onDelete }) {
    const [input, setInput] = useState("");

    function handleKeyDown(e) {
        if (e.key == "Enter" && input.trim() != "") {
            onAdd(input.trim());
            setInput("");
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm">
                {label}
                {isRequired && (<span className="text-red-500 text-sm">*</span>)}
            </label>
            <input 
                type="text" 
                className="text-sm border-1 border-black rounded-sm px-2 py-2 focus:bg-border-800 max-w-80" 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                value={input}
                placeholder="Enter to add"
                required={isRequired}
            />
            <div className="max-w-100">
                {values.map((value, i) => (
                    <div key={i} className="inline-flex items-center p-1 m-1 gap-1 bg-gray-100 rounded-sm">
                        <p className="text-xs">{value}</p>
                        <button onClick={() => {onDelete(i)}}>                
                            <FontAwesomeIcon icon={faDeleteLeft} className="hover:text-red-500 hover:cursor-pointer" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Input2;