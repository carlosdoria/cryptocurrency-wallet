import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import * as S from './styles'

interface UserCurrencyCardProps {
  title: string
  value: number
}

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

export function UserCurrencyCard ({ title, value }: UserCurrencyCardProps) {
  const classes = useStyles()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper className={fixedHeightPaper}>
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
        <Typography color="textSecondary" className={classes.depositContext}>
          on 15 March, 2019
        </Typography>
        <div>
          <Link color="primary" href="#">
          View balance
          </Link>
        </div>
      </Paper>
    </Grid>
  )
}
