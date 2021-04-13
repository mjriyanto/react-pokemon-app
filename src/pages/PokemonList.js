import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import { GET_POKEMON_LIST } from "../graphql/Queries";
import Button from "../components/Button";
import Card from "../components/Card";
import Loader from "../components/Loader";

const StyledPokemonList = styled.div`
  padding: 30px 20px;
  background: #90caf9;
  .grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    margin: 0 0 40px;
    gap: 10px;
  }
  .loader {
    text-align: center;
  }
`;

const PokemonList = () => {
  const history = useHistory();
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(10);

  const { loading, data } = useQuery(GET_POKEMON_LIST, {
    variables: {
      limit,
      offset: 0,
    },
  });

  function goToDetail(name) {
    history.push(`pokemon/${name}`);
  }

  useEffect(() => {
    data && setPokemons(data.pokemons.results);
  }, [data]);

  return (
    <>
      {pokemons.length !== 0 ? (
        <StyledPokemonList>
          <div className='grid'>
            {pokemons.map((pokemon) => (
              <Card
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                image={pokemon.image}
                goToDetail={goToDetail}
              />
            ))}
          </div>
          {!loading && (
            <div className='loader'>
              <Button onClick={() => setLimit(limit + 10)}>Load More</Button>
            </div>
          )}
        </StyledPokemonList>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PokemonList;
