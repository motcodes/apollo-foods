import useSWR from 'swr'
import { fetcher } from './fetcher'
import { server } from './server'

export function useUser() {
  const { data } = useSWR(`${server}/api/user`, fetcher)
  return data?.user
}
