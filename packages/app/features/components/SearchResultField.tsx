import { XStack, YStack, Image, Text } from '@my/ui'
import { useQuery } from "@apollo/client"
import { Query } from "../../../@types/types"
import { searchPokemon } from "../../../graphql/queries"

type PropType = {
  pokemonName: string
}

const SearchResultField: React.FC<PropType> = ({ pokemonName }) => {
  const { loading, error, data } = useQuery<Query>(searchPokemon, { variables: { name: pokemonName } })

  console.log(`SearchResultField pokemonName: ${pokemonName}`)

  if(!pokemonName) return <></>
  if(loading)  return <><Text>"loading..."</Text></>
  if(error) return <><Text>` Error! ${error.message}`</Text></>
  if (!data || !data.pokemon) return <><Text>No Data.</Text></>

    return (
        <YStack>
            <Text>No: {data?.pokemon?.number}</Text>
            <Text>Name: {data?.pokemon?.name}</Text>
            {data?.pokemon?.image ? (
                <Image src={data?.pokemon?.image} width={360} height={283} />
            ) : (
                <Text>no image.</Text>
            )}
        </YStack>
    )
}
export { SearchResultField }