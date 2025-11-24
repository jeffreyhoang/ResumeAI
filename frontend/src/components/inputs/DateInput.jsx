function DateInput({ isCurrent, fromValue, toValue, onFromChange, onToChange }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-40">
                <label className="text-sm">
                    From
                    <span className="text-red-500 text-sm">*</span>
                </label>
                <input 
                    type="month" 
                    required={true}
                    value={fromValue}
                    onChange={onFromChange}
                    className="text-sm border-1 border-black rounded-sm px-2 py-2 focus:bg-border-800 hover:cursor-pointer" 
                />
            </div>
            {!isCurrent && (
                <div className="flex flex-col gap-1 w-40">
                    <label className="text-sm">
                        To
                        <span className="text-red-500 text-sm">*</span>
                    </label>
                    <input 
                        type="month" 
                        required={true}
                        value={toValue}
                        onChange={onToChange}
                        className="text-sm border-1 border-black rounded-sm px-2 py-2 focus:bg-border-800 hover:cursor-pointer" 
                    />
                </div>
            )}
        </div>
    )
};

export default DateInput;