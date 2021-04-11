import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GET_POKEMON_LIST } from "../graphql/Queries";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(10);

  const { data } = useQuery(GET_POKEMON_LIST, {
    variables: {
      limit,
      offset: 0,
    },
  });

  const history = useHistory();

  useEffect(() => {
    data && setPokemons(data.pokemons.results);
  }, [data]);

  return (
    <div>
      {pokemons.length === 0 ? (
        "Loading..."
      ) : (
        <>
          {pokemons.map((pokemon) => (
            <div key={pokemon.name}>
              <p>{pokemon.name}</p>
              <p>{pokemon.url}</p>
              <p>{pokemon.image}</p>
              <button onClick={() => history.push(`pokemon/${pokemon.name}`)}>
                Detail
              </button>
            </div>
          ))}
          <button onClick={() => setLimit(limit + 10)}>Load more</button>
        </>
      )}
    </div>
  );
}

export default PokemonList;
