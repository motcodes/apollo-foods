import { fetcher, mealDbRandom } from '../../../lib'

export default async function (req, res) {
  const { meals } = await fetcher(mealDbRandom)
  res.status(200).json({
    ...meals[0],
  })
}
