import useSWR from 'swr'
import { fetcher } from './fetcher'
import { server } from './server'

export function useRandomMeal(options) {
  const { data, error } = useSWR(`${server}/api/meal/random`, fetcher, {
    refreshInterval: 0,
    ...options,
  })
  const loading = !data && !error
  return {
    loading,
    data,
    error,
  }
}
