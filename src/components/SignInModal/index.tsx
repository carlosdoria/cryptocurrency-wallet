import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { useAuth } from '../../hooks/useAuth'

// import * as S from './styles'
interface SignInModalProps {
  isOpenSignInModal: boolean
  handleCIsOpenSignInModal: () => void
}

export function SignInModal ({ isOpenSignInModal, handleCIsOpenSignInModal }: SignInModalProps) {
  const context = useAuth()
  return (
    <Dialog open={isOpenSignInModal} onClose={handleCIsOpenSignInModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login - {context.user.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
        To subscribe to this website, please enter your email address here. We will send updates
        occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCIsOpenSignInModal} color="primary">
        Cancel
        </Button>
        <Button onClick={handleCIsOpenSignInModal} color="primary">
        Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
