// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("pokemon-search");
    const searchButton = document.getElementById("search-button");

    // Add event listener to the search button
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();

        // Validate the input
        if (!query) {
            alert("Please enter a Pokémon name or ID!");
            return;
        }

        // Call the search function
        searchPokemon(query);
    });

    // Add "Enter" key functionality for the search bar
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});

// Function to search Pokémon using the PokéAPI
async function searchPokemon(query) {
    const resultContainer = document.querySelector(".pokemon-info");
    
    if (!resultContainer) {
        alert("Pokémon data display area is missing!");
        return;
    }

    resultContainer.innerHTML = `
        <p><strong>Result:</strong> Searching for Pokémon "${query}"...</p>
        <p>Loading Pokémon data...</p>
    `;

    try {
        // Fetch data from the PokéAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const pokemonData = await response.json();
        displayPokemonInfo(pokemonData);
    } catch (error) {
        // Handle errors (e.g., Pokémon not found)
        resultContainer.innerHTML = `
            <p>Sorry, we couldn't find that Pokémon. Please try again!</p>
        `;
    }
}

// Function to display Pokémon data including Pokédex number
async function displayPokemonInfo(pokemon) {
    const { id, name, types, sprites, height, weight, species } = pokemon;
    const pokemonTypes = types.map(type => type.type.name).join(", ");

    // Fetch region info
    const region = await getRegion(species.url);

    const resultContainer = document.querySelector(".pokemon-info");
    resultContainer.innerHTML = `
        <div class="pokemon-details">
            <div class="left-info">
                <h2>#${id} - ${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <img src="${sprites.front_default}" alt="${name}" />
                <p><strong>Type:</strong> ${pokemonTypes}</p>
                <p><strong>Height:</strong> ${height / 10} m</p>
                <p><strong>Weight:</strong> ${weight / 10} kg</p>
                <p><strong>Region:</strong> ${region}</p> <!-- Region -->
            </div>
            <div class="right-info">
                <h3>Pokédex Entry</h3>
                <p>${await getPokedexEntry(species.url)}</p>
            </div>
        </div>
    `;
}

// Function to get the Pokédex entry
async function getPokedexEntry(speciesUrl) {
    const response = await fetch(speciesUrl);
    const data = await response.json();
    return data.flavor_text_entries[0].flavor_text.replace(/\n|\r/g, ' '); // Clean up line breaks
}

// Function to get the region information from the Pokémon species endpoint
async function getRegion(speciesUrl) {
    const response = await fetch(speciesUrl);
    const data = await response.json();
    const region = data.generation.name.charAt(0).toUpperCase() + data.generation.name.slice(1);
    return region;
}