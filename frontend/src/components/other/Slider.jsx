function Slider({ value, setValue }) {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold mb-1">Content Size</h1>
            <p className="text-sm text-gray-600 mb-4">Slide to control how large or compact your resume content appears.</p>
            <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full accent-blue-800 hover:cursor-pointer"
            />
            <div className="flex justify-between text-sm mt-1 text-gray-600">
                <span>1</span>
                <span>10</span>
            </div>
        </div>
    );
}

export default Slider;