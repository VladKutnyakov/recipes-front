import { PlusIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Grid, Box, TextField, IconButton, Flex, Badge, Switch, TextArea, Text, Button } from '@radix-ui/themes'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { CreateAiMessageDto } from '@/features/aiRecipeGenerator/api/types'

interface Props {
  isPending: boolean
  onSubmit?: (props: { value: CreateAiMessageDto }) => void
}

function AiRecipeGeneratorForm (props: Props) {
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
    onSubmit: props.onSubmit,
  })

  function changeIsAdditionalIngredients (newValue: boolean) {
    form.setFieldValue('additionalIngredientsCount', newValue ? 3 : 0)
    setIsAdditionalIngredients(newValue)
  }
  
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
          <Text as="label">
            Использовать дополнительные ингредиенты
            <Box>
              <Switch
                checked={isAdditionalIngredients}
                onCheckedChange={(e) => { changeIsAdditionalIngredients(e) }}
              />
            </Box>
          </Text>
        </Box>
        <Box width="100%">
          <form.Field
            name="additionalIngredientsCount"
            children={(field) => (
              <>
                <Text as="label">
                  Максимальное количество дополнительных ингредиентов
                  <TextField.Root
                    value={field.state.value}
                    disabled={!isAdditionalIngredients}
                    type="number"
                    onBlur={field.handleBlur}
                    onChange={(e) => { field.handleChange(e.target.value) }}
                  />
                </Text>
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
        <Button type="submit" loading={props.isPending}>
          Придумать
        </Button>
      </Grid>
    </form>
  </>
}

export default AiRecipeGeneratorForm