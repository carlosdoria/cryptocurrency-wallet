
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { PriceCard } from 'components'

import * as S from './styles'

export default function Home () {

  const tiers = [
    {
      title: 'Britas',
      price: '10',
      description: [
        'Cotação de compra'
      ],
      buttonText: 'Sign up for free',
    },
    {
      title: 'Bitcoins',
      price: '15',
      description: [
        '20 users included',
      ],
      buttonText: 'Get started',
    },
  ]

  return (
    <Container maxWidth="lg" component="main">
      {/* <Grid container> */}
      <S.Details item md={6}>
        {/* <div className={classes.mainFeaturedPostContent}> */}
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                CryptoCurrency Wallet
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
                Carteira digital de criptomoedas, que permite a compra, venda e troca de moedas digitas!
        </Typography>
        <Link variant="subtitle1" href="https://pt.wikipedia.org/wiki/Criptomoeda" target='_blank' color='secondary'>
                O que são moedas digitas?
        </Link>
        {/* </div> */}
      </S.Details>
      {/* </Grid> */}

      <Grid container spacing={5} alignItems="center" justifyContent='space-between'>
        {tiers.map((tier, index) => (
          <PriceCard
            key={index}
            title={tier.title}
            price={tier.price}
          />
        ))}
      </Grid>
    </Container>
  )
}

