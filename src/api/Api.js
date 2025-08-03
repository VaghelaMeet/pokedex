// Main Api = "https://pokeapi.co/api/v2"

const Api1 = "https://pokeapi.co/api/v2/pokemon/?"; // pokemon

export const fetchPokemon = async (offset = 0) => {
  try {
    let res = await fetch(`${Api1}offset=${offset}&limit=12`);
    let data = await res.json();
    return data.results;
  } catch (error) {
    console.log("failed to fetch pokemon", error);
  }
};

const Api2 = "https://pokeapi.co/api/v2/pokemon"; // pokemon detail

export const fetchPokeDetail = async (id) => {
  try {
    let res = await fetch(`${Api2}/${id}`);
    console.log("res", res);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log("failed to fetch pokemon detail", error);
  }
};

const Api3 = "https://pokeapi.co/api/v2/pokemon-species/"; // category & evolutions

export const fetchCategory = async (id) => {
  try {
    let res = await fetch(`${Api3}/${id}`);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log("failed to fetch category", error);
  }
};
