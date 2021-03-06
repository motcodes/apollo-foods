/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import useSWR from 'swr'
import { fetcher } from './fetcher'
import { formatNewMeal } from './formatMeal'
import { server } from './server'

export function useMealById(id, options) {
  const { data } = useSWR(`${server}/api/meal/${id}`, fetcher, options)
  const formatedData = formatNewMeal(data)
  return formatedData
}
