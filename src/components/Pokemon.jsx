import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPokemon, fetchPokeDetail } from "../api/Api";

const Loader = () => (
  <div className="flex justify-center items-center p-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
  </div>
);

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [pokeDetail, setPokeDetail] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPokemonData = async () => {
      setIsLoading(true);

      const data = await fetchPokemon(offSet);
      setPokemon((prevItems) => [...prevItems, ...data]);

      const ids = data.map((d) => d.url.split("/").slice(-2)[0]);
      const details = await Promise.all(ids.map((id) => fetchPokeDetail(id)));
      setPokeDetail((prev) => [...prev, ...details]);

      setIsLoading(false);
    };
    getPokemonData();
  }, [offSet]);

  const handleLoad = () => {
    setOffSet((prev) => prev + 12);
  };

  const handleSearch = async () => {
    setSearchError("");

    if (search.trim() === "") {
      setSearchError("Please enter Pokémon name or ID.");
      setFiltered([]);
      return;
    }

    try {
      const result = await fetchPokeDetail(search.toLowerCase());
      if (result && result.name) {
        setFiltered([result]);
      } else {
        setSearchError("No Pokémon found.");
        setFiltered([]);
      }
    } catch (error) {
      setSearchError("No Pokémon found.");
      setFiltered([]);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setSearchError("");
      setFiltered([]);
    }
  }, [search]);

  const displayedPokemon = filtered.length > 0 ? filtered : pokeDetail;

  return (
    <div className="min-h-screen bg-white pb-0.5 mx-25">
      <h1 className="text-4xl font-extrabold text-center text-red-600 pt-10 underline">
        Pokedex
      </h1>

      <div className="flex justify-center mt-8 gap-4 px-4 flex-wrap">
        <input
          type="text"
          placeholder="Search Pokémon by ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="border-2 border-gray-300 focus:ring-2 focus:ring-red-400 px-5 py-3 rounded-xl w-72 outline-none transition-all shadow-md"
        />

        <button
          onClick={handleSearch}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-3 rounded-xl shadow-md transition-all"
        >
          Search
        </button>
      </div>

      {searchError && (
        <p className="text-red-600 text-center mt-3 font-medium">
          {searchError}
        </p>
      )}

      {isLoading && pokemon.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
            {displayedPokemon.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-red-100 via-white to-blue-200 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 p-5 ring-1 ring-red-300"
              >
                {item && item.sprites?.other?.dream_world?.front_default && (
                  <Link to={`/pokemon/${item.id}`}>
                    <img
                      src={item.sprites.other.dream_world.front_default}
                      alt={item.name}
                      className="mx-auto w-32 h-32"
                    />
                  </Link>
                )}
                <h2 className="text-xl text-center font-bold mt-3 capitalize">
                  #{item.id} {item.name}
                </h2>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center mb-5">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  onClick={handleLoad}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Pokemon;
