import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const id = JSON.parse(req.body)

  try {
    const removeMeal = await prisma.meal.delete({
      where: {
        id: parseInt(id),
      },
    })

    if (removeMeal.id === parseInt(id)) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    res.json({ message: error, success: false })
  }
}
