import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "$/pages/Dashboard.jsx";
import Form from "$/pages/Form.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
            </Routes>
        </BrowserRouter>
    ) 
}

export default App;
