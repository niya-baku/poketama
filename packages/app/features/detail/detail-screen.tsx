import { Button, Paragraph, XStack, YStack, Sheet, Select, Adapt, Text, Spinner } from '@my/ui'
import React, { useState } from 'react'
import { DetailField } from '../components/DetailField'
import { createParam } from 'solito'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../../../graphql/client'

const { useParam } = createParam<{ id: string }>()

export function DetailScreen() {
  const [id] = useParam('id')
  const numID = Number(id)

  return (
    <XStack f={1} jc="center" ai="center" space>
      <ApolloProvider client={apolloClient}>
        <DetailField id={numID} />
      </ApolloProvider>
    </XStack>
  )
}
