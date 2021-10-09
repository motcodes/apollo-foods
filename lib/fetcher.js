/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
export async function fetcher(url, options) {
  const res = await fetch(url, options)
  return res.json()
}
