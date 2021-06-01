/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
export function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  const item = arr[randomIndex]
  return item
}
