import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;



