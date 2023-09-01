import logo from "./logo.svg";
import "./App.css";
import MovieAPI from "./Components/MovieAPI";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Discover from "./Components/Discover";
import MoviePopup from "./Components/MoviePopup";
import MovieCard from "./Components/MovieCard";
import ArtistPopup from "./Components/ArtistPopup";
import Search from "./Components/Search";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<MovieAPI />} />
                <Route path="/movies" element={<Discover type="Movie" />} />
                <Route path="/series" element={<Discover type="Series" />} />
                <Route path="/info" element={<MoviePopupWithState />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    );
}

const MoviePopupWithState = () => {
    const location = useLocation();
    const state = location.state;
    const type = state.type;
    const details = state.details;
    if (type === "Artist") return <ArtistPopup details={details} />;
    return <MoviePopup type={type} details={details} />;
};

export default App;
