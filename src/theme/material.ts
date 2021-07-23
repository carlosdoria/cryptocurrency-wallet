import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#121214',
    },
    secondary: {
      main: '#fbd625',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})
