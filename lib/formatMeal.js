export function formatMeal(data) {
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strSource,
    strMealThumb,
  } = data
  const strIngredients = filterListToValue(data, 'strIngredient')
  const strMeasure = filterListToValue(data, 'strMeasure')
  // console.log('strIngredients :', strIngredients)
  // console.log('strMeasure :', strMeasure)

  return {
    mealId: idMeal,
    mealName: strMeal,
    mealCategory: strCategory,
    mealArea: strArea,
    mealInstructions: strInstructions,
    mealIngredients: strIngredients,
    mealMeasure: strMeasure,
    mealRecipeSource: strSource,
    mealImageLink: strMealThumb,
  }
}
export function formatNewMeal(data) {
  const mealIngredients = filterListToValue(data, 'mealIngredients')
  const mealMeasure = filterListToValue(data, 'mealMeasure')
  data.mealIngredients = mealIngredients
  data.mealMeasure = mealMeasure
  return {
    mealId: data.mealId,
    mealName: data.mealName,
    mealCategory: data.mealCategory,
    mealArea: data.mealArea,
    mealInstructions: data.mealInstructions,
    mealRecipeSource: data.mealRecipeSource,
    mealImageLink: data.mealImageLink,
    mealIngredients: mealIngredients,
    mealMeasure: mealMeasure,
  }
}

export const filterListToValue = (list, filterString) =>
  Object.keys(list)
    .map(function (key) {
      if (key.includes(filterString) && list[key]) {
        return list[key]
      }
    })
    .filter((item) => item !== undefined && item !== '' && item !== ' ')

export const filterListToObject = (list, filterString) =>
  Object.keys(list)
    .map(function (key) {
      if (key.includes(filterString) && list[key])
        return { label: key, value: list[key] }
    })
    .filter((item) => item !== undefined || item !== '')
