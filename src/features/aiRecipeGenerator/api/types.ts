export interface CreateAiMessageDto {
  ingredients: string[]
  cuisine: string
  comment: string
}

export interface IngredientDto {
  name: string
  amount: string
}

export interface ResponseCreateAiMessageDto {
  name: string
  ingredients: IngredientDto[]
  portions: string
  steps: string[]
}
