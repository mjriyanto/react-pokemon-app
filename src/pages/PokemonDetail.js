import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";

import { GET_POKEMON_DETAIL } from "../graphql/Queries";
import Loader from "../components/Loader";
import Title from "../components/Title";
import Detail from "../components/Detail";
import Result from "../components/Result";
import Button from "../components/Button";
import Input from "../components/Input";
import pokeball from "../assets/pokeball.png";

const StyledPokemonDetail = styled.div`
  padding: 30px 20px;
  background: #90caf9;
  .image-container {
    background: #ffffff;
    border: 2px solid #222;
    border-radius: 50%;
    margin: 20px 50px;
    padding: 25px;
    text-align: center;
    .pokemon-image {
      width: 100%;
    }
  }
  .pokeball {
    width: 20%;
  }
`;

const PokemonDetail = () => {
  let { name } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const [screen, setScreen] = useState("detail");
  const [pokename, setPokename] = useState("");

  const { data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name,
    },
  });

  function catchPokemon() {
    let result = Math.random() < 0.5;
    if (result) setScreen("success");
    else setScreen("fail");
  }

  useEffect(() => {
    data && setPokemon(data.pokemon);
  }, [data]);

  return (
    <>
      {screen === "success" ? (
        <Result>
          <p>
            You catched it! Now input a name to save your Pokemon to your
            inventory.
          </p>
          <br />
          <Input handleChange={setPokename} />
          <Button onClick={() => localStorage.setItem("Name", pokename)}>
            Save
          </Button>
        </Result>
      ) : screen === "fail" ? (
        <Result>
          <p>Fail!</p>
          <br />
          <Button onClick={() => setScreen("detail")}>Back</Button>
        </Result>
      ) : pokemon ? (
        <StyledPokemonDetail>
          <div>
            <div>
              <Title primary>
                <p className='title'>{pokemon.name}</p>
              </Title>
              {pokemon.sprites.front_default && (
                <div className='image-container'>
                  <img
                    className='pokemon-image'
                    src={pokemon.sprites.front_default}
                    alt='pokemon'
                  />
                </div>
              )}
              <Button onClick={() => catchPokemon()} catch>
                <img src={pokeball} className='pokeball' alt={"pokeball"} />
                <p className='title'>Catch</p>
              </Button>
            </div>
            <div>
              <Title>
                <p className='title'>Types</p>
              </Title>
              <Detail>
                {pokemon.types &&
                  pokemon.types.map((types) => {
                    const { type } = types;
                    return (
                      <div className='card' key={type.name}>
                        <p>{type.name}</p>
                      </div>
                    );
                  })}
              </Detail>
            </div>
            <div>
              <Title>
                <p className='title'>Moves</p>
              </Title>
              <Detail>
                {pokemon.moves &&
                  pokemon.moves.map((moves) => {
                    const { move } = moves;
                    return (
                      <div className='card' key={move.name}>
                        <p>{move.name}</p>
                      </div>
                    );
                  })}
              </Detail>
            </div>
          </div>
        </StyledPokemonDetail>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PokemonDetail;
