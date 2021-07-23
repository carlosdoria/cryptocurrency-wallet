import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import { SignInModal } from 'components/SignInModal'
import { SignUpModal } from 'components/SignUpModal'

import * as S from './styles'

export function Header () {
  const [ isOpenSignInModal, setIsOpenSignInModal ] = useState(false)
  const [ isOpenSignUpModal, setIsOpenSignUpModal ] = useState(false)

  const handleCIsOpenSignInModal = () => {
    setIsOpenSignInModal(!isOpenSignInModal)
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

        <nav>
          <S.NavLink variant="button" color="textPrimary" onClick={handleCIsOpenSignInModal}>
            Login
          </S.NavLink>
        </nav>
        <Button href="#" color="secondary" variant="outlined" onClick={handleCIsOpenSignUpModal}>
          SignUp
        </Button>
      </S.Bar>

      <SignInModal isOpenSignInModal={isOpenSignInModal} handleCIsOpenSignInModal={handleCIsOpenSignInModal}/>
      <SignUpModal isOpenSignUpModal={isOpenSignUpModal} handleCIsOpenSignUpModal={handleCIsOpenSignUpModal}/>
    </S.Header>
  )
}
