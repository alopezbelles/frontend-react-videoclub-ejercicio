import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from './containers/Home/Home';
import MovieDetail from './components/Films/MovieDetail/MovieDetail';
import Movies from './containers/Movies/Movies';
import { allMovies, homeMovies } from './services/ApiCalls';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import About from './containers/About/About';
import Admin from './containers/Admin/Admin';
import Deleted from './containers/Deleted/Deleted';
import DirectedBy from './containers/DirectedBy/DirectedBy';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/filmdetail" element={<MovieDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="/directed_by" element={<DirectedBy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
