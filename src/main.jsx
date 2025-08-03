import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // {/* </StrictMode>, */}
);

//   // Get ID + image using name
//   const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
//   const pokeData = await pokeRes.json();

//   evolutions.push({
//     name: pokeName,
//     id: pokeData.id,
//     image: pokeData.sprites.front_default,
//   });
