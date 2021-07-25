
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import { Layout, UserCurrencyCard } from 'components'

import * as S from './styles'

export default function Dashboard () {

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
