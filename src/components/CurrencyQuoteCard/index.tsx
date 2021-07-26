
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import * as S from './styles'

interface CurrencyQuoteCardProps {
  title: string
  price: number | undefined
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
          <Typography component="h2" variant="h5" align="center">
            { price === undefined ?
              'Cotação não realizada'
              :
              'Cotação de compra'
            }
          </Typography>

          <Typography component="h2" variant="h3" color="textPrimary">
            { price === undefined ?
              'R$ 0,00'
              :
              Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }).format(price)
            }
          </Typography>

        </S.CardContainer>
      </Card>
    </Grid>
  )
}
