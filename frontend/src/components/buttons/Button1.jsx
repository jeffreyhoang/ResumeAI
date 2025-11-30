function Button1({ text, onClick }) {
    return (
        <div>
            <button onClick={onClick} className="bg-blue-800 text-white py-1 px-4 rounded-full text-lg hover:cursor-pointer hover:bg-blue-900 active:scale-95 transition-all">
                {text}
            </button>
        </div>
    )
};

export default Button1;