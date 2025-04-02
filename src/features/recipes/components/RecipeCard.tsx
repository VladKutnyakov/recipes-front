import { Tables } from "@/types/database.types"
import styles from '../assets/RecipeCard.module.css'

interface Props {
  item: Tables<'recipe'>,
}

function RecipeCard ({ item }: Props) {
  const createdAtDate = new Date(item.created_at).toLocaleDateString('ru')

  return <>
    <div className={styles['recipe-card']}>
      <div className={styles['recipe-card__image']}>
      </div>
      <div className={styles['recipe-card__info']}>
        <div className={styles['recipe-card__name']}>
          { item.name }
        </div>
        <div className={styles['recipe-card__description']}>
          { item.description }
        </div>
        <div className={styles['recipe-card__date']}>
          { createdAtDate }
        </div>
      </div>
    </div>
  </>
}

export default RecipeCard