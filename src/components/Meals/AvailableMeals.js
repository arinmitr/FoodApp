import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useEffect, useState } from 'react/cjs/react.development'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://food-app-794bd-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
        )
        if (!response.ok) {
          throw new Error('Something went wrong!')
        }
        const data = await response.json()
        const loadedMeals = []
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          })
        }
        setMeals(loadedMeals)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setHttpError(err.message)
      }
    }
    fetchMeals()
  }, [])
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if (httpError) {
    return (
      <section className={classes.mealsLoading}>
        <p>{httpError}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
