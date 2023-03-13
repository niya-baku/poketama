import gql from "graphql-tag"

export const getPokemons = gql`
query getPokemons($generation: String, $offset: Int) {
  species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: $generation}}}, order_by: {id: asc}, offset: $offset, limit: 18) {
    id
    speciesNames: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 1}}) {
      name
      genus
    }
  }
}
`


export const generationsCount = gql`
query generationsCount($generation: String) {
  generations: pokemon_v2_generation(where: {name: {_eq: $generation}}) {
    species: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
}
`