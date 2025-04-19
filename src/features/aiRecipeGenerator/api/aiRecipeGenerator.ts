import axios from 'axios'
import { CreateAiMessageDto, ResponseCreateAiMessageDto } from './types'

export function requestRecipe (dto: CreateAiMessageDto) {
  return axios.post<ResponseCreateAiMessageDto>('/api/ai/recipe', dto)
}
