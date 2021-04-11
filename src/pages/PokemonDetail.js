import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "../graphql/Queries";

function PokemonDetail() {
  let { name } = useParams();
  const [moves, setMoves] = useState([]);
  const [types, setTypes] = useState([]);
  const [catched, setCatched] = useState(undefined);

  const { data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name,
    },
  });

  function catchPokemon() {
    let result = Math.random() < 0.5;
    setCatched(result);
  }

  useEffect(() => {
    data && setMoves(data.pokemon.moves);
    data && setTypes(data.pokemon.types);
    data && console.log(types);
  }, [data]);

  return (
    <div>
      {moves.length === 0 ? (
        "Loading..."
      ) : (
        <>
          <h1>Name</h1>
          {name}
          <h1>Moves</h1>
          {moves &&
            moves.map((move) => (
              <div key={move.move.name}>
                <p>{move.move.name}</p>
              </div>
            ))}
          <h1>Type</h1>
          {types &&
            types.map((type) => (
              <div key={type.type.name}>
                <p>{type.type.name}</p>
              </div>
            ))}
          <h1>Catch</h1>
          <button onClick={() => catchPokemon()}>Catch!</button>
          <p>
            {catched === undefined ? "empty" : catched ? "success" : "fail"}
          </p>
        </>
      )}
    </div>
  );
}

export default PokemonDetail;
