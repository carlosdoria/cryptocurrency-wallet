import { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

import { useCurrencies } from 'hooks/useCurrencies'
import { Layout, CurrencyQuoteCard } from 'components'

import * as S from '../styles/index.styles'

export default function Home () {
  const {
    britasPrice,
    bitcoinsPrice,
    getBritasPrice,
    getBitcoinsPrice
  } = useCurrencies()

  useEffect(() => {
    getBritasPrice()
    getBitcoinsPrice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <S.Details item md={6}>

        <Typography component='h1' variant='h3' color='inherit' gutterBottom>
          CryptoCurrency Wallet
        </Typography>

        <Typography variant='h5' color='inherit' paragraph>
          Carteira digital de criptomoedas, que permite a compra, venda e troca de moedas digitas!
        </Typography>

        <Link variant='subtitle1' href='https://pt.wikipedia.org/wiki/Criptomoeda' target='_blank' color='secondary'>
          O que são moedas digitas?
        </Link>

      </S.Details>

      <Grid container spacing={5} alignItems='center' justifyContent='space-between'>
        <CurrencyQuoteCard
          title='Britas'
          price={britasPrice?.cotacaoCompra}
        />
        <CurrencyQuoteCard
          title='Bitcoins'
          price={Number(bitcoinsPrice?.buy)}
        />
      </Grid>
    </Layout>
  )
}
