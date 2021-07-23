import Image from 'next/image'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import * as S from './styles'

export function Header () {
  return (
    <S.Header position="static" color="primary" elevation={0}>
      <S.Bar>
        <S.Logo variant="h6" color="inherit" noWrap >
          <Link href='/'>
            <Image src='/logo.png' width={220} height={50} alt='Logo'/>
          </Link>
        </S.Logo>

        <nav>
          <S.NavLink variant="button" color="textPrimary">
            Login
          </S.NavLink>
        </nav>

        <Button href="#" color="secondary" variant="outlined">
          SignUp
        </Button>
      </S.Bar>
    </S.Header>
  )
}
