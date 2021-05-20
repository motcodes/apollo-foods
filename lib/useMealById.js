import useSWR from 'swr'
import { fetcher } from './fetcher'
import { server } from './server'

export function useMealById(id, options) {
  const { data, error } = useSWR(`${server}/api/meal/${id}`, fetcher, options)
  const loading = !data && !error
  return {
    loading,
    data,
    error,
  }
}
