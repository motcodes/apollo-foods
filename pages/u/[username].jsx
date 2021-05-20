import Layout from '../../components/Layout'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getServerSideProps({ params }) {
  console.log(params.username)
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  })
  const userData = JSON.parse(JSON.stringify(user))
  console.log(userData)
  return {
    props: userData,
  }
}

export default function User(props) {
  console.log(props)
  return (
    <Layout>
      <h1>{props.username}</h1>
      <p>{props.bio}</p>
    </Layout>
  )
}
