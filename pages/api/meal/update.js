/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const body = JSON.parse(req.body)

  try {
    const saveMeal = await prisma.meal.update({
      where: {
        id: parseInt(body.id),
      },
      data: {
        textureColor: body.textureColor,
        placeholderImage: body.placeholderImage,
      },
    })

    if (saveMeal) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    res.json({ message: error, success: false })
  }
}
