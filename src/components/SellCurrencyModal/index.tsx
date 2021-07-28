import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { useAuth } from 'hooks/useAuth'
import { useCurrencies } from 'hooks/useCurrencies'

interface Props {
  transaction: string
  title: string
}

export function SellCurrencyModal ({ transaction, title }: Props) {
  const { user, updateUserFirebase, findUserFirebase, createTransactionFirebase } = useAuth()
  const { bitcoinsPrice, britasPrice } = useCurrencies()

  const [ open, setOpen ] = useState(false)
  const [ currencyAmount, setCurrencyAmount ] = useState<number>(0)

  const currencyQuote = title === 'Bitcoins' ? Number(bitcoinsPrice?.sell) : Number(britasPrice?.cotacaoVenda)
  const amountCurrencyInWallet = title === 'Bitcoins' ? user.bitcoins : user.britas

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setCurrencyAmount(0)
    setOpen(false)
  }

  async function sellCurrency () {
    if (currencyAmount === 0) {
      alert('O campo esta vazio')
      return
    }

    if (currencyAmount > amountCurrencyInWallet) {
      alert('O valor desejado utrapassa o valor da sua carteira')
      return
    }

    const valuePurchased = user.real + currencyAmount * currencyQuote

    const amountSpent = amountCurrencyInWallet - currencyAmount

    const updateProps = {
      id: user.id,
      currencySold: title.toLowerCase(),
      amountSpent,
      purchasedCurrency: 'real',
      valuePurchased
    }

    const newTransaction = {
      id: user.id,
      title: 'Venda',
      currencySold: 'real',
      amountSpent: currencyAmount,
      currencyPurchased: title.toLowerCase(),
      valuePurchased: currencyAmount * currencyQuote
    }

    await updateUserFirebase(updateProps)
    await createTransactionFirebase(newTransaction)
    await findUserFirebase(user.id)
    handleClose()
  }

  return (
    <div>
      <Button color="secondary" variant="outlined" onClick={handleOpen}>
        {transaction === 'sell' ? 'Vender' : 'Comprar' }
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{transaction === 'sell' ? 'Vender' : 'Comprar' } {title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
          <TextField
            id="outlined-full-width"
            label={title}
            value={currencyAmount}
            defaultValue={0}
            type='number'
            style={{ margin: 8 }}
            placeholder="Placeholder"
            onChange={e => setCurrencyAmount(Number(e.target.value))}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            // variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="Reais"
            style={{ margin: 8 }}
            value={
              Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
              }).format(currencyAmount * currencyQuote)
            }
            disabled
            placeholder="0"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            // variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={sellCurrency} color="secondary" autoFocus>
            {transaction === 'sell' ? 'Vender' : 'Comprar' }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
