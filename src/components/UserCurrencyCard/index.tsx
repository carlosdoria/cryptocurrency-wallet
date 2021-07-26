import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import * as S from './styles'

interface UserCurrencyCardProps {
  title: string
  value: number | undefined
}

export function UserCurrencyCard ({ title, value }: UserCurrencyCardProps) {

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
              currency: 'BRL'
            }).format(value)
            :
            'R$ 0,00'
          }
        </Typography>
        {/* <Typography color="textSecondary" className={classes.depositContext}> //flex: 1
          on 15 March, 2019
        </Typography> */}
        {/* <div>
          <Link color="primary" href="#">
          View balance
          </Link>
        </div> */}
      </S.Content>
    </Grid>
  )
}
