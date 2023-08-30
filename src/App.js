import logo from "./logo.svg";
import "./App.css";
import MovieAPI from "./Components/MovieAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiscoverMovie from "./Components/DiscoverMovie";
import DiscoverSeries from "./Components/DiscoverSeries";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<MovieAPI />} />
                <Route path="/movies" element={<DiscoverMovie />} />
                <Route path="/series" element={<DiscoverSeries />} />
            </Routes>
        </Router>
    );
}

export default App;
