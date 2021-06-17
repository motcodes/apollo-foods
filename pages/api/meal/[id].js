/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { fetcher, mealDbById } from '../../../lib'

export default async function (req, res) {
  const mealId = req.query.id
  const { meals } = await fetcher(`${mealDbById}${mealId}`)
  res.status(200).json({
    ...meals[0],
    // id: req.query.id,
  })
}
