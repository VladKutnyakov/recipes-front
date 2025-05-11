import { Flex, Heading, DataList, Box, Text } from '@radix-ui/themes'
import { ResponseCreateAiMessageDto } from '@/features/aiRecipeGenerator/api/types'

interface Props {
  data: ResponseCreateAiMessageDto
}

function AiRecipeGeneratorResult (props: Props) {
  return <>
    <Flex gap="2" direction="column" mt="32px">
      <Heading>{props.data.name}</Heading>
      <DataList.Root size="3">
        <DataList.Item>
          <DataList.Label>
            Ингредиенты
          </DataList.Label>
          <DataList.Value>
            <ul>
              {props.data.ingredients.map((item, index) => 
                <li key={index}>
                  <Text>
                    {item.name} - {item.amount}
                  </Text>
                </li>
              )}
            </ul>
          </DataList.Value>
        </DataList.Item>
        
        <DataList.Item>
          <DataList.Label>
            Кол-во порций
          </DataList.Label>
          <DataList.Value>
            <Text>{props.data.portions}</Text>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <Flex gap="2" direction="column">
        {props.data.steps.map((item, index) => 
          <Box key={index} width="100%">
            <Text key={index}>
              {index + 1}. {item}
            </Text>
          </Box>
        )}
      </Flex>
    </Flex>
  </>
}

export default AiRecipeGeneratorResult