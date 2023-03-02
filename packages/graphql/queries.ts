import gql from "graphql-tag"

export const searchPokemon = gql`
    query searchPokemon($name: String) {
        pokemon(name: $name) {
            number
            name
            image
        }
    }
`