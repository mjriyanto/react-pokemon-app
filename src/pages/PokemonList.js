import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import { GET_POKEMON_LIST } from "../graphql/Queries";
import Button from "../components/Button";
import Card from "../components/Card";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

const StyledPokemonList = styled.div`
  padding: 30px 20px;
  .grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    margin: 0 0 40px;
    gap: 10px;
  }
  .loader {
    text-align: center;
  }
  @media screen and (min-width: 620px) {
    .grid {
      grid-template-columns: repeat(9, 1fr);
    }
  }
  @media screen and (min-width: 960px) {
    .grid {
      grid-template-columns: repeat(12, 1fr);
    }
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

  function getOwned(name) {
    let inventory = localStorage.getItem("pokemon");
    if (inventory) {
      let owned = 0;
      inventory = JSON.parse(inventory);
      // eslint-disable-next-line
      inventory.map((inv) => {
        if (inv.name === name) {
          owned = owned + 1;
        }
      });
      return owned;
    } else return 0;
  }

  useEffect(() => {
    data && setPokemons(data.pokemons.results);
  }, [data]);

  return (
    <>
      {pokemons.length !== 0 ? (
        <StyledPokemonList>
          <PageTitle title='List of All Pokemon' />
          <div className='grid'>
            {pokemons.map((pokemon) => (
              <Card
                pokemonlist
                id={'pokemon-list'}
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                image={pokemon.image}
                goToDetail={goToDetail}
                getOwned={getOwned}
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
