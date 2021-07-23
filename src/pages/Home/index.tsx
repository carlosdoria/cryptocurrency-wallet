import { useEffect, useState } from 'react'
// import { GetServerSideProps } from 'next'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

import { britasApi } from 'services/britas'
import { bitcoinsApi } from 'services/bitcoins'
import { PriceCard } from 'components'

import * as S from './styles'

interface IBritasPrice {
  cotacaoCompra: number
  cotacaoVenda: number
  dataHoraCotacao: string
}

interface IBitcoinsPrice {
  buy: string
  sell: string
}

export default function Home () {
  const [ britasPrice, setBritasPrice ] = useState<IBritasPrice>({} as IBritasPrice)
  const [ bitcoinsPrice, setBitcoinsPrice ] = useState<IBitcoinsPrice>({} as IBitcoinsPrice)

  const date = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date())
  const formattedDate = date.replace(/\//g, '-')

  async function getBritasPrice () {
    const { data } = await britasApi.get(`/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${formattedDate}'`)
    setBritasPrice(data.value[ 0 ])
  }

  async function getBitcoinsPrice () {
    const { data } = await bitcoinsApi.get('/BTC/ticker/')
    setBitcoinsPrice(data.ticker)
  }

  useEffect(() => {
    getBritasPrice()
    getBitcoinsPrice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth='lg' component='main'>
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
        <PriceCard
          title='Britas'
          price={britasPrice.cotacaoCompra}
        />
        <PriceCard
          title='Bitcoins'
          price={Number(bitcoinsPrice.buy)}
        />
      </Grid>
    </Container>
  )
}
