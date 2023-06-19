import { Form } from '@tamagui/form'
import { Input, Button } from 'tamagui'
import { useState } from 'react'

type PropType = {
  setpokemonName: React.Dispatch<React.SetStateAction<string>>
}

const SearchForm: React.FC<PropType> = ({ setpokemonName }) => {
  const [textData, setTextData] = useState('')

  const submitHandler = (text) => {
    if (text !== null) {
      setpokemonName(text)
    }
  }

  return (
    <Form onSubmit={() => submitHandler(textData)}>
      <Input onChangeText={(text) => setTextData(text)} placeholder="input Pokemon's name" />
      <Form.Trigger asChild>
        <Button>Search on submit</Button>
      </Form.Trigger>
    </Form>
  )
}

export { SearchForm }
