import React from "react";
import { Link } from "react-router-dom";

export default function Pokedex() {
  let [pageNumber, setPageNumber] = React.useState(1);
  const prevPage = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };
  const nextPage = () => setPageNumber(pageNumber + 1);

  return (
    <>
      <ShowPokemon pageNumber={pageNumber} />
      <Button buttonText={"PREV PAGE"} onClick={prevPage}></Button>

      <Button buttonText={"NEXT PAGE"} onClick={nextPage}></Button>
    </>
  );
}

function Button({ buttonText, onClick }) {
  return <button onClick={onClick}>{buttonText}</button>;
}

function ShowPokemon({ pageNumber }) {
  const amountOfPokemonsShowed = 15;
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    const pokemonIds = [];
    for (let i = 1 + amountOfPokemonsShowed * (pageNumber - 1); i <= amountOfPokemonsShowed * pageNumber; i++) {
      pokemonIds.push(i);
    }

    const getAllPokemons = async () => {
      const promises = pokemonIds.map(async (pokemonId) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error("Response was not OK!");
        }
        const data = await response.json();
        return data;
      });

      setPokemons(await Promise.all(promises));
    };

    getAllPokemons();
  }, [pageNumber]);

  if (pokemons === null) {
    return;
  }

  const pokemonTable = pokemons.map((pokemon) => (
    <td key={pokemon.id}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
        <p>
          Number: <span id="id">{pokemon.id}</span>
        </p>
        <p>
          Name: <span id="name">{pokemon.name}</span>
        </p>
      </Link>
    </td>
  ));

  return (
    <>
      <table>
        <tbody>
          <tr>{pokemonTable}</tr>
        </tbody>
      </table>
    </>
  );
}
