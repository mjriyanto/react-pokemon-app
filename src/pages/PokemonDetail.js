import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
  @media screen and (max-width: 959px) and (min-width: 620px) {
    .image-container {
      width: 50%;
      margin: 20px auto;
    }
    .catch-button {
      width: 25%;
      margin: 20px auto;
    }
  }
  @media screen and (min-width: 960px) {
    .flex-container {
      display: flex;
      .avatar {
        width: 40%;
        padding: 10px 20px;
      }
      .info {
        width: 60%;
        padding: 10px 20px;
      }
    }
  }
`;

const PokemonDetail = () => {
  let { name } = useParams();
  const history = useHistory();
  const [pokemon, setPokemon] = useState(undefined);
  const [screen, setScreen] = useState("detail");
  const [pokename, setPokename] = useState("");
  const [error, setError] = useState("");

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

  function removeDashes(string) {
    return string.replace(/-/g, " ");
  }

  function getLocalStore() {
    let local = localStorage.getItem("pokemon");
    if (local) {
      return JSON.parse(localStorage.getItem("pokemon"));
    } else {
      return [];
    }
  }

  function storeData(inventory, catched) {
    inventory.push(catched);
    localStorage.setItem("pokemon", JSON.stringify(inventory));
    setPokename("");
    history.push("/inventory");
  }

  function savePokemon(value) {
    let inventory = getLocalStore();
    let catched;

    // Check if catched pokemon name is empty
    if (pokename !== "") {
      catched = {
        ...value,
        nickname: pokename,
      };
    } else {
      setError("empty");
      setScreen("error");
      return;
    }

    // Check if there is pokemon in inventory
    if (inventory.length > 0) {
      // Check for the duplicate name
      let isDuplicate = false;
      // eslint-disable-next-line
      inventory.map((inv) => {
        if (pokename.toUpperCase() === inv.nickname.toUpperCase()) {
          isDuplicate = true;
        }
      });
      if (!isDuplicate) {
        storeData(inventory, catched);
      } else {
        setError("duplicate");
        setScreen("error");
        setPokename("");
      }
    } else {
      storeData(inventory, catched);
    }
  }

  useEffect(() => {
    data && setPokemon(data.pokemon);
  }, [data]);

  return (
    <>
      {screen === "success" ? (
        <Result>
          <p>
            {`You catched ${pokemon.name}! Now input its name to save it to your
            inventory.`}
          </p>
          <br />
          <Input handleChange={setPokename} />
          <Button onClick={() => savePokemon(pokemon)}>Save</Button>
        </Result>
      ) : screen === "fail" ? (
        <Result>
          <p>{`Fail! The ${pokemon.name} ran away...`}</p>
          <br />
          <Button onClick={() => setScreen("detail")}>Back</Button>
        </Result>
      ) : screen === "error" ? (
        <Result>
          <p>
            {error === "empty"
              ? `Please fill the pokemon name!`
              : `The name is existing!`}
          </p>
          <br />
          <Button onClick={() => setScreen("success")}>Back</Button>
        </Result>
      ) : pokemon ? (
        <StyledPokemonDetail>
          <div className='flex-container'>
            <div className='avatar'>
              <div title='title'>
                <Title primary>
                  <p className='title'>{pokemon.name}</p>
                </Title>
                <div className='image-container'>
                  <img
                    className='pokemon-image'
                    src={pokemon.sprites.front_default}
                    alt='pokemon'
                  />
                </div>
                <Button onClick={() => catchPokemon()} className='catch-button' catch>
                  <img src={pokeball} className='pokeball' alt={"pokeball"} />
                  <p className='title'>Catch!</p>
                </Button>
              </div>
            </div>
            <div className='info'>
              <div title='types'>
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
              <div title='moves'>
                <Title>
                  <p className='title'>Moves</p>
                </Title>
                <Detail>
                  {pokemon.moves &&
                    pokemon.moves.map((moves) => {
                      const { move } = moves;
                      return (
                        <div className='card' key={move.name}>
                          <p>{removeDashes(move.name)}</p>
                        </div>
                      );
                    })}
                </Detail>
              </div>
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
