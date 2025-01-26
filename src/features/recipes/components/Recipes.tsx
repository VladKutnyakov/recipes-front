import { useEffect, useState } from "react"
import { getRecipes } from "../api/recipes"
import { Tables } from "@/types/database.types"
import styles from '../assets/Recipes.module.css'
import RecipeCard from "./RecipeCard"

function Recipes () {
  const [recipes, setRecipes] = useState<Array<Tables<'recipe'>>>([])

  useEffect(() => {
    const fetchData = () => {
      getRecipes().then(response => {
        setRecipes(response.data || [])
      })
    }

    fetchData()
  }, [])

  return <>
    <div className={styles['recipes']}>
      { recipes.map(item => <RecipeCard key={item.id} item={item} />) }
    </div>
  </>
}

export default Recipes
