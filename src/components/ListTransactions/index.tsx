import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { useAuth } from 'hooks/useAuth'
import * as S from './styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
)

export function ListTransactions () {
  const { transactions } = useAuth()
  const classes = useStyles()

  const currency = (currencyType:string) => {
    switch (currencyType) {
    case 'bitcoins':
      return 'XBT'

    case 'britas':
      return 'USD'

    case 'real':
      return 'BRL'
    }
  }

  return (
    <List className={classes.root}>
      {Object.keys(transactions).map((transaction, index) => (
        <ListItem alignItems="flex-start" key={index} style={{ borderBottom: '1px solid #ccc' }}>
          <ListItemText
            primary={`${transactions[ transaction ].title} de ${transactions[ transaction ].currencyPurchased}`}
            secondary={
              transactions[ transaction ].title === 'Compra' ?
                <>
                  <S.Value>
                    - {Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: currency(transactions[ transaction ].currencySold),
                      minimumFractionDigits: transactions[ transaction ].currencySold == 'bitcoins' ? 8 : 2
                    }).format(transactions[ transaction ].amountSpent)}
                  </S.Value>
                  <S.Value>
                    {Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: currency(transactions[ transaction ].currencyPurchased),
                      minimumFractionDigits: transactions[ transaction ].currencyPurchased == 'bitcoins' ? 8 : 2
                    }).format(transactions[ transaction ].valuePurchased)}
                  </S.Value>
                </>
                :
                <>
                  <S.Value>
                    - {Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: currency(transactions[ transaction ].currencyPurchased),
                      minimumFractionDigits: transactions[ transaction ].currencyPurchased == 'bitcoins' ? 8 : 2
                    }).format(transactions[ transaction ].amountSpent)}
                  </S.Value>
                  <S.Value>
                    {Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: currency(transactions[ transaction ].currencySold),
                      minimumFractionDigits: transactions[ transaction ].currencySold == 'bitcoins' ? 8 : 2
                    }).format(transactions[ transaction ].valuePurchased)}
                  </S.Value>
                </>

            }
          />
        </ListItem>
      ))}
      {/* <Divider variant="inset" component="li" /> */}
    </List>
  )
}
