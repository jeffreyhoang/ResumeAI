function Input1({ label, value, isRequired, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm">
                {label}
                {isRequired && <span className="text-red-500 text-sm">*</span>}
            </label>
            <input 
                type="text" 
                required={isRequired} 
                className="text-sm border-1 border-black rounded-sm px-2 py-2 focus:bg-border-800 max-w-80" 
                value={value}
                onChange={onChange}
            />
        </div>
    )
};

export default Input1;