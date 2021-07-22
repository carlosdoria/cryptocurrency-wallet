import Link from 'next/link'
import Button from '@material-ui/core/Button'
import * as S from './styles'

export function Header () {
  return (
    <S.Header position="static" color="default" elevation={0}>
      <S.Bar>
        <S.Logo variant="h6" color="inherit" noWrap >
          <Link href='/'>
            CryptoCurrency
          </Link>
        </S.Logo>
        <nav>
          <Link href='/signIn'>
            <S.NavLink variant="button" color="textPrimary" href="#">
              Login
            </S.NavLink>
          </Link>
        </nav>
        <Button href="#" color="primary" variant="outlined">
          <Link href='/signUp'>
            SignIn
          </Link>
        </Button>
      </S.Bar>
    </S.Header>
  )
}
