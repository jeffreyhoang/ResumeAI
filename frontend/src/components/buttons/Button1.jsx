function Button1({ text, onClick, loading = false }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="relative font-head bg-blue-800 text-white py-1 px-4 rounded-full text-lg hover:bg-blue-900 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
            <span className={loading ? "invisible" : "visible"}>
                {text}
            </span>

            {/* Spinner */}
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                </span>
            )}
        </button>
    );
}

export default Button1;
