import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokeDetail, fetchCategory } from "../api/Api";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import TypeBadge from "./TypeBadge";
import WeaknessBadge from "./WeaknessBadge";

// Loader Component
const Loader = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-blue-50">
    <div className="relative w-20 h-20 animate-spin">
      <div className="absolute inset-0 border-4 border-black rounded-full"></div>
      <div className="absolute w-full h-1/2 bg-red-500 rounded-t-full border-4 border-black"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-black rounded-full z-10"></div>
    </div>
    <p className="mt-6 text-2xl font-bold text-gray-800 animate-pulse">
      Loading Pokémon...
    </p>
  </div>
);

const PokemonDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [category, setCategory] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const pokemonDetail = async () => {
      setIsLoading(true);
      const data = await fetchPokeDetail(id);
      setDetail(data);

      const typeUrl = data.types.map((t) => t.type.url);
      const typeData = await Promise.all(
        typeUrl.map((url) => fetch(url).then((res) => res.json()))
      );
      const WeaknessData = typeData
        .flatMap((type) => type.damage_relations.double_damage_from)
        .map((w) => w.name);

      const oneWeakness = Array.from(new Set(WeaknessData)).map((name) => ({
        name,
      }));
      setWeaknesses(oneWeakness);

      const categoryData = await fetchCategory(data.id);
      setCategory(categoryData);

      const eChainUrl = categoryData.evolution_chain.url;
      const eChainData = await fetch(eChainUrl).then((res) => res.json());

      const evolutions = [];
      let abc = eChainData.chain;

      while (abc) {
        const pokeName = abc.species.name;
        const pokeRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        );
        const pokeData = await pokeRes.json();

        evolutions.push({
          name: pokeName,
          id: pokeData.id,
          image: pokeData.sprites.other.dream_world.front_default,
        });
        abc = abc.evolves_to[0];
      }
      setEvolution(evolutions);
      setIsLoading(false);
    };

    pokemonDetail();
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 px-6 pb-10">
      {/* Navigation */}
      <div className="flex justify-between max-w-6xl mx-auto pt-8">
        <button
          onClick={() => detail.id > 1 && navigate(`/pokemon/${detail.id - 1}`)}
          className="flex items-center cursor-pointer text-2xl gap-2 px-8 py-3 border-2 border-blue-400 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          <GoChevronLeft size={24} />
          Previous
        </button>
        <button
          onClick={() => navigate(`/pokemon/${detail.id + 1}`)}
          className="flex items-center cursor-pointer gap-2 px-8 py-3 text-2xl border-2 border-blue-400 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          Next
          <GoChevronRight size={24} />
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center capitalize mt-6 text-gray-800">
        {detail.id}. {detail.name}
      </h1>

      {/* Detail Section */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-10">
        <div className="flex items-center bg-gradient-to-br from-red-200 via-white to-blue-300 rounded-3xl p-6 shadow-xl">
          <img
            src={detail.sprites.other.dream_world.front_default}
            alt={detail.name}
            className="w-100 h-100 mx-auto drop-shadow-xl"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">
              Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Height :
                </span>
                <span className="text-lg font-medium">
                  {(detail.height / 10).toFixed(1)} m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Weight :
                </span>
                <span className="text-lg font-medium">
                  {(detail.weight / 10).toFixed(1)} kg
                </span>
              </div>
              {category && (
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Category :
                  </span>
                  <span className="text-lg font-medium">
                    {
                      category.genera.find(
                        (genus) => genus.language.name === "en"
                      )?.genus
                    }
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Abilities :
                </span>
                <div className="flex flex-wrap gap-2">
                  {detail.abilities.map((ability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium capitalize"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Types */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Types
            </h2>
            <div className="flex flex-wrap gap-3">
              <TypeBadge types={detail.types} />
            </div>
          </div>

          {/* Weaknesses */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Weaknesses
            </h2>
            <div className="flex flex-wrap gap-3">
              <WeaknessBadge weaknesses={weaknesses} />
            </div>
          </div>
        </div>
      </div>

      {/* Evolutions */}
      <div className="bg-white mx-40 mt-5 mb-2 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold underline p-5">Evolutions</h1>
        <div className="flex justify-center gap-20 p-5">
          {evolution.map((poke) => (
            <div
              key={poke.id}
              onClick={() => navigate(`/pokemon/${poke.id}`)}
              className="cursor-pointer text-center text-white"
            >
              <img
                src={poke.image}
                alt={poke.name}
                className="h-50 w-50 border-8 border-double border-gray-800 p-2 rounded-full hover:scale-102"
              />
              <p className="mt-2 capitalize text-xl text-gray-800">
                {poke.id}. {poke.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
