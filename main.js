async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        // Display Pokémon information
        document.getElementById("pokemonInfo").innerHTML = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <p>National Number: ${data.id}</p>
            <p>Species: ${data.species.name}</p>
            <p>Height: ${data.height / 10} m</p>
            <p>Weight: ${data.weight / 10} kg</p>
            <p>Types: ${data.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Local Number: ${data.id}</p>
        `;
    } catch (error) {
        console.error(error);
        document.getElementById("pokemonInfo").innerHTML = "<p>Pokémon not found.</p>";
    }
}
