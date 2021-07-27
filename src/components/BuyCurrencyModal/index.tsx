import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { useAuth } from 'hooks/useAuth'
import { useState, useRef } from 'react'
import { useCurrencies } from 'hooks/useCurrencies'

interface Props {
  transaction: string
  title: string
  currencyFormat: string
}

export function BuyCurrencyModal ({ transaction, title, currencyFormat }: Props) {
  const inputRef = useRef()
  const { user, updateUserFirebase, findUserFirebase } = useAuth()
  const { bitcoinsPrice, britasPrice } = useCurrencies()

  const [ open, setOpen ] = useState(false)
  const [ currencyAmount, setCurrencyAmount ] = useState<number>(0)

  const currencyQuote: number = title === 'Bitcoins' ? Number(bitcoinsPrice?.buy) : Number(britasPrice?.cotacaoCompra)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setCurrencyAmount(0)
    setOpen(false)
  }

  async function buyCurrency () {
    if (currencyAmount === 0) {
      alert('O campo esta vazio')
      return
    }

    if (currencyAmount > user.real) {
      alert('O valor desejado  utrapassa o valor da sua carteira')
      return
    }

    const currentValueInWrallet = title === 'Bitcoins' ? user.bitcoins : user.britas

    const purchasedValue = (currencyAmount / currencyQuote) + currentValueInWrallet

    const amountSpent = user.real - currencyAmount

    const updateProps = {
      id: user.id,
      currencySold: 'real',
      amountSpent,
      purchasedCurrency: title.toLowerCase(),
      purchasedValue
    }

    await updateUserFirebase(updateProps)
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
            inputRef={inputRef}
            id="outlined-full-width"
            label="Reais"
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
            label={title}
            style={{ margin: 8 }}
            value={
              Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: currencyFormat,
                minimumFractionDigits: currencyFormat === 'BRL' ? 2 : 8
              }).format(currencyAmount / currencyQuote)
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
          <Button onClick={buyCurrency} color="secondary" autoFocus>
            {transaction === 'sell' ? 'Vender' : 'Comprar' }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
