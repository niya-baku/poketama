import { Stack, XStack, YStack, Image, Text, Spinner, ScrollView, Button, H2} from '@my/ui'
import { useQuery } from "@apollo/client"
import { Species, GenerationsCount } from "../../../@types/types"
import { getPokemons, generationsCount } from "../../../graphql/queries"
import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from '@tamagui/lucide-icons'

type PropType = {
  value: string,
}

const ResultField: React.FC<PropType> = ({ value }) => {
  const [offset, setOffset] = useState(0)
  const { loading: loadPokemon, error: errorPokemon, data: pokemonData }  = useQuery<Species>(getPokemons, { variables: { generation: value, offset: offset } })

  const prevPokens = () => {
    const prevOffset = offset - 18
    setOffset(prevOffset < 0 ? 0 : prevOffset)
  }

  const nextPokens = () => {
    const nextOffset = offset + 18
    setOffset(nextOffset)
  }
  if(loadPokemon)  return <Spinner size="large" color="$green10" />
  if(errorPokemon) return <><Text>` Error! ${errorPokemon.message}`</Text></>
  if (!pokemonData || !pokemonData.species) return <><Text>No Data.</Text></>

    return (
      <ScrollView w="100%" bc="$background">
        <XStack als={'center'} justifyContent='center'>
          <Button marginRight="$2" marginTop="$2" o={offset == 0 ? 0.5 : 1} disabled={offset == 0 ? true : false} icon={ChevronLeft}  onPress={prevPokens}>前へ</Button>
          <Button marginLeft="$2" marginTop="$2" icon={ChevronRight} onPress={nextPokens}>次へ</Button>
        </XStack>
        <XStack flex={1} flexWrap="wrap" p="$1"  als={'center'} justifyContent='center'>
          {pokemonData.species.map(item => 
            <XStack p="$2" als={'center'}  justifyContent='center'>
            <YStack p="$2">
              <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item?.id}.png`} width={120} height={120} zIndex={0} />
              <Text p="$1">なまえ: {item?.speciesNames[0]?.name}</Text>
            </YStack>
            </XStack>
          )}
        </XStack>
      </ScrollView>
    )
}
export { ResultField }