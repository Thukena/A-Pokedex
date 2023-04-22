import React from "react";
import { useLocation } from "react-router-dom";

export default function About() {
  const id = useLocation().pathname.split("/")[2];

  return (
    <>
      <ShowPokemon pokemonId={id} />
    </>
  );
}

function ShowPokemon({ pokemonId }) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    async function handleSubmit(pokemonId) {
      if (!pokemonId) {
        return;
      }

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) {
        throw new Error("Response was not OK!");
      }
      const data = await response.json();

      setPokemon(data);
    }

    handleSubmit(pokemonId);
  }, [pokemonId]);

  if (pokemon === null) {
    return null;
  }

  const abilitiesTable = pokemon.abilities.map((ability) => (
    <td key={ability.ability.name}>
      <h4>{ability.ability.name}</h4>
    </td>
  ));

  const statsTable = pokemon.stats.map((stat) => (
    <tr key={stat.stat.name}>
      <td>
        <h4>{stat.stat.name}</h4>
      </td>

      <td>
        <h4>{stat.base_stat}</h4>
      </td>
    </tr>
  ));

  return (
    <>
      <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
      <h3>Name: {pokemon.name}</h3>
      <h3>
        Type:{" "}
        {pokemon.types[1]?.type.name
          ? `${pokemon.types[0].type.name}/${pokemon.types[1].type.name}`
          : pokemon.types[0].type.name}
      </h3>

      <table>
        <tbody>
          <tr>
            <th>
              <h3>Abilities:</h3>
            </th>
            {abilitiesTable}
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>Base stats:</th>
          </tr>
          {statsTable}
        </tbody>
      </table>

      <h3>Height: {pokemon.height / 10} m</h3>
      <h3>Weight: {pokemon.weight / 10} kg</h3>
    </>
  );
}
