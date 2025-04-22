import { useMutation } from '@tanstack/react-query'
import { requestRecipe } from '@/features/aiRecipeGenerator/api/aiRecipeGenerator'
import { useForm } from '@tanstack/react-form'
import { CreateAiMessageDto } from '@/features/aiRecipeGenerator/api/types'
import { Box, Button, TextArea, TextField, Text, IconButton, Badge, Heading, Flex, DataList, Grid, Switch } from '@radix-ui/themes'
import { useState } from 'react'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'

function AiRecipeGenerator () {
  const [newIngredient, setNewIngredient] = useState('')
  const [isAdditionalIngredients, setIsAdditionalIngredients] = useState(false)
  const form = useForm({
    defaultValues: {
      ingredients: [],
      prUseAllIngredients: false,
      additionalIngredientsCount: 0,
      cuisine: '',
      comment: '',
    } as CreateAiMessageDto,
    onSubmit: ({ value }) => {
      mutation.mutate(value)
    }
  })

  const mutation = useMutation({
    mutationFn: requestRecipe,
  })

  function submitForm (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }

  return <>
    <form onSubmit={submitForm}>
      <Grid gap="16px">
        <Box width="100%">
          <form.Field
            name="ingredients"
            mode="array"
          >
            {(field) => (
              <>
                <Text as="label">
                  Ингредиенты
                  <TextField.Root
                    value={newIngredient}
                    maxLength={50}
                    onChange={(e) => { setNewIngredient(e.target.value) }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        e.stopPropagation()
                        field.pushValue(newIngredient)
                        setNewIngredient('')
                      }
                    }}
                  >
                    <TextField.Slot side="right">
                      <IconButton
                        variant='ghost'
                        type="button"
                        onClick={() => { 
                          field.pushValue(newIngredient)
                          setNewIngredient('')
                        }}
                      >
                        <PlusIcon></PlusIcon>
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </Text>
                { field.state.value.length > 0 &&
                  <Flex gap="1" my="4px">
                    {field.state.value.map((value, i) => 
                      <Badge key={i}>
                        {value}
                        <IconButton
                          variant='ghost'
                          type="button"
                          onClick={() => {
                            field.removeValue(i)
                          }}
                        >
                          <Cross2Icon width="8" height="8"></Cross2Icon>
                        </IconButton>
                      </Badge>
                    )}
                  </Flex>
                }
              </>
            )}
          </form.Field>
        </Box>
        <Box width="100%">
          <form.Field
            name="prUseAllIngredients"
            children={(field) => (
              <Text as="label">
                Использовать все указанные ингредиенты
                <Box>
                  <Switch
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onCheckedChange={(e) => { field.handleChange(e) }}
                  />
                </Box>
              </Text>
            )}
          />
        </Box>
        <Box width="100%">
          <form.Field
            name="additionalIngredientsCount"
            children={(field) => (
              <>
                <Text as="label">
                  Использовать дополнительные ингредиенты
                  <Box>
                    <Switch
                      checked={isAdditionalIngredients}
                      onCheckedChange={(e) => { setIsAdditionalIngredients(e) }}
                    />
                  </Box>
                </Text>
                {isAdditionalIngredients &&
                  <Text as="label">
                    Максимальное количество дополнительных ингредиентов
                    <TextField.Root
                      value={field.state.value}
                      type="number"
                      onBlur={field.handleBlur}
                      onChange={(e) => { field.handleChange(e.target.value) }}
                    />
                  </Text>
                }
              </>
            )}
          />
        </Box>
        <Box width="100%">
          <form.Field
            name="cuisine"
            children={(field) => (
              <Text as="label">
                Кухня
                <TextField.Root
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => { field.handleChange(e.target.value) }}
                />
              </Text>
            )}
          />
        </Box>
        <Box width="100%">
          <form.Field
            name="comment"
            children={(field) => (
              <Text as="label">
                Примечание
                <TextArea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => { field.handleChange(e.target.value) }}
                />
              </Text>
            )}
          />
        </Box>
        <Button type="submit" loading={mutation.isPending}>
          Придумать
        </Button>
      </Grid>
    </form>
    { mutation.isSuccess &&
      <Flex gap="2" direction="column" mt="32px">
        <Heading>{mutation.data.data.name}</Heading>
        <DataList.Root size="3">
          <DataList.Item>
            <DataList.Label>
              Ингредиенты
            </DataList.Label>
            <DataList.Value>
              <ul>
                {mutation.data.data.ingredients.map((item, index) => 
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
              <Text>{mutation.data.data.portions}</Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <Flex gap="2" direction="column">
          {mutation.data.data.steps.map((item, index) => 
            <Box key={index} width="100%">
              <Text key={index}>
                {index + 1}. {item}
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
    }
  </>
} 

export default AiRecipeGenerator