/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const id = JSON.parse(req.body)

  try {
    const removeMeal = await prisma.meal.delete({
      where: {
        id: parseInt(id),
      },
    })
    // console.log('removeMeal :', removeMeal)

    if (removeMeal.id === parseInt(id)) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    res.json({ message: error, success: false })
  }
}
