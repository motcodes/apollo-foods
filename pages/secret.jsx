import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import { Typography } from '../utils'

export default function Secret() {
  const [session, loading] = useSession()
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/secret')
      const json = await res.json()
      console.log('json :', json)

      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  if (typeof window !== 'undefined' && loading) return null

  if (!session) {
    return (
      <Layout>
        <Typography variant="h1">Youre not sigend in</Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <Typography variant="h1">Secret Page</Typography>
      <Typography>{content}</Typography>
    </Layout>
  )
}
