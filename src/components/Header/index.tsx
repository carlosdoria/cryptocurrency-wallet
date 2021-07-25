import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import { useAuth } from 'hooks/useAuth'
import { SignInModal } from 'components/SignInModal'
import { SignUpModal } from 'components/SignUpModal'

import * as S from './styles'

export function Header () {
  const context = useAuth()
  const [ isOpenSignInModal, setIsOpenSignInModal ] = useState(false)
  const [ isOpenSignUpModal, setIsOpenSignUpModal ] = useState(false)

  async function handleCIsOpenSignInModal () {
    await context.signInWithGoogle()
    // setIsOpenSignInModal(!isOpenSignInModal)
  }

  const handleCIsOpenSignUpModal = () => {
    setIsOpenSignUpModal(!isOpenSignUpModal)
  }

  return (
    <S.Header position="static" color="primary" elevation={0}>
      <S.Bar>
        <S.Logo variant="h6" color="inherit" noWrap >
          <Link href='/'>
            <Image src='/logo.png' width={220} height={50} alt='Logo'/>
          </Link>
        </S.Logo>

        {context.user.name &&
        <nav>
          <S.NavLink
            variant="button"
            color="textPrimary"
          >
            <Link href='/dashboard'>
              Dashboard
            </Link>
          </S.NavLink>
        </nav>
        }
        <Button href="#" color="secondary" variant="outlined" onClick={handleCIsOpenSignInModal}>
          {context.user.name ?
            context.user.name
            :
            'Entrar'
          }
        </Button>
      </S.Bar>

      <SignInModal isOpenSignInModal={isOpenSignInModal} handleCIsOpenSignInModal={handleCIsOpenSignInModal}/>
      <SignUpModal isOpenSignUpModal={isOpenSignUpModal} handleCIsOpenSignUpModal={handleCIsOpenSignUpModal}/>
    </S.Header>
  )
}
