import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

import { Layout } from 'components'

import * as S from './styles'

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

export default function Dashboard () {
  const classes = useStyles()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (

    <Layout>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Deposits
            </Typography>
            <Typography component="p" variant="h4">
                $3,024.00
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
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Recent Deposits
            </Typography>
            <Typography component="p" variant="h4">
                $3,024.00
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
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Recent Deposits
            </Typography>
            <Typography component="p" variant="h4">
                $3,024.00
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
      </Grid>
      <br />
      <Divider />
    </Layout>
  )
}
