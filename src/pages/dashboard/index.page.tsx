
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'

import { Layout, UserCurrencyCard, ListTransactions } from 'components'
import { useEffect } from 'react'
import { auth } from 'services/firebase'

import * as S from './styles'
import { useAuth } from 'hooks/useAuth'
import { useCurrencies } from 'hooks/useCurrencies'

export default function Dashboard () {
  const router = useRouter()
  const context = useAuth()
  const { bitcoinsPrice, britasPrice, getBitcoinsPrice, getBritasPrice } = useCurrencies()
  const { transactions } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.push('/')
      }
    })
    if (bitcoinsPrice === undefined) getBitcoinsPrice()
    if (britasPrice === undefined) getBritasPrice()

    return () => {
      unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout>
      <S.Section>
        <h1>Minha carteira</h1>
        <Grid container spacing={3}>
          <UserCurrencyCard title='Reais' value={context.user.real} currencyFormat='BRL'/>
          <UserCurrencyCard title='Britas' value={context.user.britas} currencyFormat='USD'/>
          <UserCurrencyCard title='Bitcoins' value={context.user.bitcoins} currencyFormat='XBT'/>
        </Grid>
        <br />
        <Divider />
      </S.Section>

      <S.Section>
        <h1>Cotação de compra</h1>
        <Grid container spacing={3}>
          <UserCurrencyCard title='Britas' value={britasPrice?.cotacaoCompra} currencyFormat='USD' transaction='buy'/>
          <UserCurrencyCard title='Bitcoins' value={Number(bitcoinsPrice?.buy)} currencyFormat='XBT' transaction='buy'/>
        </Grid>
        <br />
        <Divider />
      </S.Section>

      <S.Section>
        <h1>Cotação de venda</h1>
        <Grid container spacing={3}>
          <UserCurrencyCard title='Britas' value={britasPrice?.cotacaoVenda} currencyFormat='USD' transaction='sell'/>
          <UserCurrencyCard title='Bitcoins' value={Number(bitcoinsPrice?.sell)} currencyFormat='XBT' transaction='sell'/>
        </Grid>
        <br />
        <Divider />
      </S.Section>
      <S.Section>
        <h1>Transações</h1>
        <Grid container spacing={3}>
          {transactions &&
            <ListTransactions />
          }
        </Grid>

      </S.Section>

    </Layout>
  )
}
