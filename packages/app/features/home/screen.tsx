import { H1, XStack, YStack } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../../../graphql/client'
import { ResultField } from '../components/ResultField'
import { SelectGeneration } from '../components/GenerationSelection'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })
  const [generation, setGeneration] = useState('generation-i')

  const changeGeneration = (item) => {
    setGeneration(item)
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack>
        <SelectGeneration changeGeneration={changeGeneration} value={generation} />
        <ApolloProvider client={apolloClient}>
          <ResultField value={generation} />
        </ApolloProvider>
      </YStack>
    </YStack>
  )
}
