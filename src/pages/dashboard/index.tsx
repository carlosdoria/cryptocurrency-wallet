
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'

import { Layout, UserCurrencyCard } from 'components'
import { useEffect } from 'react'
import { auth } from 'services/firebase'

import * as S from './styles'

export default function Dashboard () {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) router.push('/')
    })

    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <UserCurrencyCard title='Reais' value={10} />
        <UserCurrencyCard title='Bitcoins' value={10} />
        <UserCurrencyCard title='Britas' value={10} />
      </Grid>
      <br />
      <Divider />
    </Layout>
  )
}
