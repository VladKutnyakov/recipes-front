import { useMutation } from '@tanstack/react-query'
import { requestRecipe } from '@/features/aiRecipeGenerator/api/aiRecipeGenerator'
import AiRecipeGeneratorForm from '@/features/aiRecipeGenerator/components/AiRecipeGeneratorForm'
import AiRecipeGeneratorResult from '@/features/aiRecipeGenerator/components/AiRecipeGeneratorResult'
import { CreateAiMessageDto } from '@/features/aiRecipeGenerator/api/types'

function AiRecipeGenerator () {
  const mutation = useMutation({
    mutationFn: requestRecipe,
  })

  function submitForm (props: { value: CreateAiMessageDto }) {
    mutation.mutate(props.value)
  }

  return <>
    <AiRecipeGeneratorForm
      isPending={mutation.isPending}
      onSubmit={submitForm}
    />
    { mutation.isSuccess &&
      <AiRecipeGeneratorResult
        data={mutation.data.data}
      />
    }
  </>
} 

export default AiRecipeGenerator