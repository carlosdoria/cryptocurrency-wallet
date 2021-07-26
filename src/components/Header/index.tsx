import Image from 'next/image'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import { useAuth } from 'hooks/useAuth'

import * as S from './styles'

export function Header () {
  const context = useAuth()

  return (
    <S.Header position="static" color="primary" elevation={0}>
      <S.Bar>
        <S.Logo variant="h6" color="inherit" noWrap >
          <Link href='/'>
            <span>
              <Image src='/logo.png' width={220} height={50} alt='Logo'/>
            </span>
          </Link>
        </S.Logo>

        {context.user.name &&
        <nav>
          <Link href='/dashboard'>
            <S.NavLink
              variant="button"
              color="textPrimary"
            >
              Dashboard
            </S.NavLink>
          </Link>
        </nav>
        }
        {context.user.name ?
          <Button href="#" color="secondary" variant="outlined" onClick={context.signOut}>
            {context.user.name}
          </Button>
          :
          <Button href="#" color="secondary" variant="outlined" onClick={context.signInWithGoogle}>
          Entrar
          </Button>
        }
      </S.Bar>
    </S.Header>
  )
}
