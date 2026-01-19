function Button3({ icon, onClick, loading = false}) {
    return (
        <div className="group fixed bottom-6 right-6 z-50">
            <button
                type="button"
                onClick={onClick}
                disabled={loading}
                className="
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    bg-white
                    hover:scale-110 hover:cursor-pointer
                    transition-transform duration-200
                    disabled:opacity-60
                    shadow-lg
                "
            >
                {loading ? (
                    <span className="w-6 h-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    ) : (
                    <img
                        src={icon}
                        className="w-6 h-6"
                    />
                )}
            </button>
        </div>
    );
}

export default Button3;