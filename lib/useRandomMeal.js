import useSWR from 'swr'
import { fetcher } from './fetcher'

export function useRandomMeal(options) {
  const { data, error } = useSWR('/api/meal/random', fetcher, {
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
