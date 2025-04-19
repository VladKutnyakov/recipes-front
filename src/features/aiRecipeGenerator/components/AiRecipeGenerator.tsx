import { useMutation } from '@tanstack/react-query'
import { requestRecipe } from '@/features/aiRecipeGenerator/api/aiRecipeGenerator'
import { useForm } from '@tanstack/react-form'
import { CreateAiMessageDto } from '@/features/aiRecipeGenerator/api/types'
import { Box, Button, TextArea, TextField, Text, IconButton, Badge, Heading, Spinner, Flex, DataList, Grid } from '@radix-ui/themes'
import styles from '../assets/AiRecipeGenerator.module.css'
import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'

function AiRecipeGenerator () {
  const [newIngredient, setNewIngredient] = useState('')
  const form = useForm({
    defaultValues: {
      ingredients: [],
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

  function createIngredient (event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    form.setFieldValue('ingredients', [...form.getFieldValue('ingredients'), newIngredient])
    setNewIngredient('')
  }

  return <>
    <form className={styles['ai-recipe__form']} onSubmit={submitForm}>
      <Grid gap="8px">
        <Box width="100%">
          <form.Field
            name="ingredients"
            mode="array"
          >
            {(field) => (
              <>
                <Text as="label">
                  Ингредиенты
                  { field.state.value.length > 0 &&
                  <Flex gap="1" my="4px">
                    {field.state.value.map((value, i) => 
                      <Badge key={i}>{value}</Badge>
                    )}
                  </Flex>
                  }
                  <TextField.Root
                    value={newIngredient}
                    onChange={(e) => { setNewIngredient(e.target.value) }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      field.pushValue(newIngredient)
                      setNewIngredient('')
                    }}
                  >
                    <TextField.Slot side="right">
                      <IconButton variant='ghost' onClick={(e) => { createIngredient(e) } }>
                        <PlusIcon></PlusIcon>
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </Text>
              </>
            )}
          </form.Field>
        </Box>
        <form.Field
          name="cuisine"
          children={(field) => (
            <div className={styles['ai-recipe__form-field']}>
              <Box width="100%">
                <Text as="label">
                  Кухня
                  <TextField.Root
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => { field.handleChange(e.target.value) }}
                  />
                </Text>
              </Box>
            </div>
          )}
        />
        <form.Field
          name="comment"
          children={(field) => (
            <div className={styles['ai-recipe__form-field']}>
              <Box width="100%">
                <Text as="label">
                  Примечание
                  <TextArea
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => { field.handleChange(e.target.value) }}
                  />
                </Text>
              </Box>
            </div>
          )}
        />
      </Grid>
      <Button>
        Придумать
      </Button>
    </form>
    { mutation.isPending &&
      <Spinner size="3" />
    }
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
            <Box width="100%">
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