function Button3({ text, onClick }) {
    return (
        <div>
            <button onClick={onClick} className="text-white text-lg bg-gradient-to-r hover:bg-gradient-to-l from-purple-600 to-blue-800 py-1 px-4 rounded-full hover:cursor-pointer active:scale-95 transition-all">
                {text}
            </button>
        </div>
    )
};

export default Button3;
