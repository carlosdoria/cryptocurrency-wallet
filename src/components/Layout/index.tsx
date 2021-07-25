import * as S from './styles'

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}

export function Layout ({ children } : LayoutProps) {
  return (
    <S.Wrapper maxWidth='lg' component='main'>
      {children}
    </S.Wrapper>
  )
}
