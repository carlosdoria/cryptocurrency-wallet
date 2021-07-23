import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Link from '@material-ui/core/Link'

import styled from 'styled-components'

export const Header = styled(AppBar)`
  height: 10%;
  padding: 0 8%;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  nav {
    margin-right: 2rem;
  }
`

export const Bar = styled(Toolbar)`
  height: 100%;
`
export const NavLink = styled(Link)`
  cursor: pointer;
`

export const Logo = styled(Typography)`
  flex-grow: 1;

  img {
    cursor: pointer;
  }
`
