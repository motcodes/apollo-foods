import useSWR from 'swr'
import { fetcher } from './fetcher'

export function useMealById(id, options) {
  const { data, error } = useSWR(`/api/meal/${id}`, fetcher, options)
  const loading = !data && !error
  return {
    loading,
    data,
    error,
  }
}
