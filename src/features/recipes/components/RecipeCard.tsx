import { Tables } from "@/types/database.types"
import styles from '../assets/RecipeCard.module.css'

type Props = {
  item: Tables<'recipe'>,
}

function RecipeCard ({ item }: Props) {
  return <>
    <div className={styles['recipe-card']}>
      { item.name }
    </div>
  </>
}

export default RecipeCard