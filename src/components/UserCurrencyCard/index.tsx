import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { TransactionModal } from '../TransactionModal'
import * as S from './styles'

interface UserCurrencyCardProps {
  title: string
  currencyFormat: string
  value: number | undefined
  transaction?: string
}

export function UserCurrencyCard ({ title, currencyFormat, value, transaction = '' }: UserCurrencyCardProps) {

  return (
    <Grid item xs={12} md={4} lg={4}>
      <S.Content>
        <Typography component="h1" variant="h4" color="secondary" gutterBottom>
          {title}
        </Typography>
        <Typography component="p" variant="h4">
          { value ?
            Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: currencyFormat
            }).format(value)
            :
            '0,00'
          }
        </Typography>
        {transaction &&
          <TransactionModal transaction={transaction} title={title}/>
        }
        {/* <div>
          <Link color="primary" href="#">
          View balance
          </Link>
        </div> */}
      </S.Content>
    </Grid>
  )
}
