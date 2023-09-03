import logo from "./logo.svg";
import "./App.css";
import MovieAPI from "./Components/MovieAPI";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useSearchParams,
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
                <Route path="/info" element={<MoviePopup />} />
                <Route path="/artist" element={<ArtistPopup />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    );
}

const MoviePopupWithState = () => {
    const [params, setParams] = useSearchParams();
    const type = params.get("type");
    let details = {};
    const detailsParam = params.get("details");
    if (detailsParam) {
        details = JSON.parse(detailsParam);
    }
    if (type === "Movie" || type === "Series") return <MoviePopup />;
};

export default App;
