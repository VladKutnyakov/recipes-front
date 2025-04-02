import { useEffect, useState } from "react"
import { getRecipes } from "../api/recipes"
import { Tables } from "@/types/database.types"
import styles from '../assets/Recipes.module.css'
import RecipeCard from "./RecipeCard"

function Recipes () {
  const [recipes, setRecipes] = useState<Tables<'recipe'>[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecipes()
      setRecipes(response.data ?? [])
    }

    void fetchData()
  }, [])

  return <>
    <div className={styles.recipes}>
      { recipes.map(item => <RecipeCard key={item.id} item={item} />) }
    </div>
  </>
}

export default Recipes
