import router from 'next/router'

async function saveUser(userData, setError) {
  if (
    userData.username === '' ||
    userData.username === ' ' ||
    userData.username === null
  ) {
    setError(true)
  } else {
    userData.username = userData.username?.replace('@', '')
    userData.twitter = userData.twitter?.replace('@', '')
    userData.instagram = userData.instagram?.replace('@', '')
    userData.dribbble = userData.dribbble?.replace('@', '')
    userData.github = userData.github?.replace('@', '')
    userData.reddit = userData.reddit?.replace('@', '').replace('u/', '')

    delete userData.meals

    const infoData = await fetcher(`${server}/api/user/update`, {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    if (infoData.message === 'success') {
      if (router.query.callbackUrl) {
        const callbackUrl = new URL(router.query.callbackUrl)

        if (callbackUrl.pathname.includes('/cook/')) {
          router.replace(callbackUrl.pathname)
        } else {
          router.push(`/u/[username]`, `/u/${userData.username}`)
        }
      }
    }
  }
}
