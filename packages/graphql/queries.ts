import gql from "graphql-tag"

export const getPokemons = gql`
query getPokemons($generation: String, $offset: Int) {
  species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: $generation}}}, order_by: {id: asc}, offset: $offset, limit: 18) {
    id
    speciesNames: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 1}}) {
      name
    }
  }
}
`


export const detailPokemon = gql`
query detailPokemon($id: Int) {
  specie: pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: 1}, pokemon_species_id: {_eq: $id}}) {
    name
    genus
  }
  individualInfo: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
    stats: pokemon_v2_pokemonstats {
      base_stat
      stat_name: pokemon_v2_stat {
        name
      }
    }
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
      }
    }
    abilities: pokemon_v2_pokemonabilities {
      ability: pokemon_v2_ability {
        ability_name: pokemon_v2_abilitynames(where: {language_id: {_eq: 1}}) {
          name
        }
      }
    }
  }
}
`