import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import * as S from './styles'

interface SignUpModalProps {
  isOpenSignUpModal: boolean
  handleCIsOpenSignUpModal: () => void
}

export function SignUpModal ({ isOpenSignUpModal, handleCIsOpenSignUpModal }: SignUpModalProps) {
  return (
    <Dialog open={isOpenSignUpModal} onClose={handleCIsOpenSignUpModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cadastre-se</DialogTitle>
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
        <Button onClick={handleCIsOpenSignUpModal} color="primary">
        Cancel
        </Button>
        <Button onClick={handleCIsOpenSignUpModal} color="primary">
        Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
