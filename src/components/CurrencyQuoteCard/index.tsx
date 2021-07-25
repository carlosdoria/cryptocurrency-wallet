
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import * as S from './styles'

interface CurrencyQuoteCardProps {
  title: string
  price: number
}

export function CurrencyQuoteCard ({ title, price }: CurrencyQuoteCardProps) {

  return (
    <Grid item key={title} xs={12} sm={title === 'Enterprise' ? 12 : 6} md={4}>
      <Card>
        <S.Header
          title={title}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
        />
        <S.CardContainer>
          <Typography component="h1" variant="subtitle1" align="center">
            Cotação de compra
          </Typography>

          <Typography component="h2" variant="h3" color="textPrimary">
            { price ?
              Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }).format(price)
              :
              'R$ 0,00'
            }
          </Typography>

        </S.CardContainer>
      </Card>
    </Grid>
  )
}
