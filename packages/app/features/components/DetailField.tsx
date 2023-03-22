import { 
  Stack, 
  XStack, 
  YStack, 
  Image, 
  Text, 
  Spinner, 
  ScrollView, 
  Button, 
  H2,
  H4, 
  useMedia,
  Progress,
} from '@my/ui'

import { ChevronLeft } from '@tamagui/lucide-icons'
import { useQuery } from "@apollo/client"
import { Detail } from "../../../@types/types"
import { detailPokemon } from "../../../graphql/queries"
import { useState, useEffect } from 'react'
import { useLink } from 'solito/link'

const typeDict = {
  "normal": "ノーマル",
  "fire": "ほのお",
  "water": "みず",
  "electric": "でんき",
  "grass": "くさ",
  "ice": "こおり",
  "fighting": "かくとう",
  "poison": "どく",
  "ground": "じめん",
  "flying": "ひこう",
  "psychic": "エスパー",
  "bug": "むし",
  "rock": "いわ",
  "ghost": "ゴースト",
  "dragon": "ドラゴン",
  "dark": "あく",
  "steel": "はがね",
  "fairy": "フェアリー",
};

const statsDict = {
  "hp": "HP",
  "attack": "こうげき",
  "defense": "ぼうぎょ",
  "special-attack": "とくこう",
  "special-defense": "とくぼう",
  "speed": "すばやさ",

};

type PropType = {
  id: number,
}

type PokemonStat = {
  base_stat: number;
  stat_name: { name: string };
}

type PokemonTypes = {
  type: { name: string };
}

type PokemonAbilities = {
  ability: {
    ability_name: { name: string },
  }
};

type StateType = {
  name: string,
  genus: string,
  stats: PokemonStat[],
  types: PokemonTypes[],
  abilities: PokemonAbilities[],
}

const DetailField: React.FC<PropType> = ({ id }) => {
  const media = useMedia()
  const link = useLink({
    href: '/',
  })
  const { loading: loading, error: error, data: data }  = useQuery<Detail>(detailPokemon, { variables: { id: id } })
  const [pokemonData, setPokemonData] = useState<StateType>({
    name: "",
    genus: "",
    stats: [],
    types: [],
    abilities: [],
  })
  
  useEffect(() => {
    if (data) {
      setPokemonData({
        name: data.specie[0]?.name || "",
        genus: data.specie[0]?.genus || "",
        stats: data.individualInfo[0]?.stats || [],
        types: data.individualInfo[0]?.types || [],
        abilities: data.individualInfo[0]?.abilities || [],
      });
    }
  }, [data]);

  if(loading)  return <Spinner size="large" color="$green10" />
  if(error) return <><Text>` Error! ${error.message}`</Text></>
  if (!data) return <><Text>No Data.</Text></>

    return (
      <ScrollView w="100%" bc="$background">
        <Stack fd={media.sm ? "column" : "row"} als="center" jc="center">
          <Stack als="center" width={media.sm ? "100%" : 500}>
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
              width={media.sm ? 170 : 340} 
              height={media.sm ? 170 : 340} 
              als="center"
              zIndex={0} resizeMode="contain"/>
          </Stack>
          <Stack als="center" jc="center" w={media.sm ? 300 : 500} h={100} bw={2} boc="$color" br="$5" p="$3" m="$2">
            <H4 ta={media.sm ? "center" : "left"} >No.{id}</H4>
            <H2 ta={media.sm ? "center" : "left"}>{pokemonData.name}</H2>
          </Stack>
        </Stack>
        <Stack fd={media.sm ? "column" : "row"} als="center" >
          <Stack width={media.sm ? 300 : 500} bw={2} boc="$color" br="$5" p="$5" m="$2">
              <Text mb={40}>分類：{pokemonData.genus || "ふめい"}</Text>
            <XStack>
              <Text mb={40}>タイプ：</Text>
              {pokemonData.types.map((item, i) => 
                <Stack key={i} ml="$2">
                  <Text>{typeDict[item.type.name]}</Text>
                </Stack>
              )}
            </XStack>
            <XStack>
              <Text>特性：</Text>
              {pokemonData.abilities.map((item, i) => 
                  <Stack key={i} ml="$2">
                    <Text>{item.ability.ability_name[0].name}</Text>
                  </Stack>
                )}
            </XStack>
          </Stack>

          <YStack>
            <Stack w={media.sm ? 300 : 500} bw={2} boc="$color" br="$5" p="$3" m="$2">
              {pokemonData.stats.map((stat, i) => {
                const display_status = Math.round(stat.base_stat / 255 * 100);
                return (
                <XStack key={i} h={60} w={media.sm ? "30%" : "70%"} ai="center">
                  <Stack w={media.sm ? "100%" : "30%"}>
                    <Text ml="$2">{statsDict[stat.stat_name.name]}</Text>
                  </Stack>
                  <Progress size="$2.5" value={display_status} >
                    <Progress.Indicator animation="bouncy" bc="red"/>
                  </Progress>
                  <Text ml="$2">{stat.base_stat}</Text>
                </XStack>)
              })}
            </Stack>
          </YStack>
        </Stack>

        {!media.sm &&
          <YStack f={1} jc="center" ai="center" space m="$2">
            <Button {...link} icon={ChevronLeft}>
              前ページへ戻る
            </Button>
          </YStack>
        }
      </ScrollView>
    )
}
export { DetailField }