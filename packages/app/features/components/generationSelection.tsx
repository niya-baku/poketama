import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Adapt, Select, Sheet, YStack, XStack, Text } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

const selectItems = [
  { generation: 'generation-i'},
  { generation: 'generation-ii' },
  { generation: 'generation-iii' },
  { generation: 'generation-iv' },
  { generation: 'generation-v' },
  { generation: 'generation-vi' },
  { generation: 'generation-vii' },
  { generation: 'generation-viii' },
  { generation: 'generation-ix' },
]

type PropType = {
  changeGeneration: (item: string) => void,
  value: string,
}

const SelectGeneration: React.FC<PropType> = ({ changeGeneration, value }) => {
  return (
    <XStack als={'center'}>
    <Select id="generation" value={value} onValueChange={changeGeneration}>
      <Select.Trigger w={180} iconAfter={ChevronDown}>
        <Select.Value placeholder="Select..." />
      </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet modal dismissOnSnapToBottom>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

      <Select.Content zIndex={0}>
        <Select.Viewport minWidth={200} disableScroll={true}>
          <Select.Group space="$-0">
            <Select.Label>世代を選択</Select.Label>
            {selectItems.map((item, i) => {
              const generationMap = {
                'generation-i': '第一世代',
                'generation-ii': '第二世代',
                'generation-iii': '第三世代',
                'generation-iv': '第四世代',
                'generation-v': '第五世代',
                'generation-vi': '第六世代',
                'generation-vii': '第七世代',
                'generation-viii': '第八世代',
                'generation-ix': '第九世代',
              };
              const generationText = generationMap[item.generation] || item.generation;
              return (
                <Select.Item index={i} key={item.generation} value={item.generation}>
                  <Select.ItemText>{generationText}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
    </XStack>
  )
}
export { SelectGeneration }