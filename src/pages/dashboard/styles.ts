import styled from 'styled-components'
import Container from '@material-ui/core/Container'

interface IContainer {
  component: string
}

export const Wrapper = styled(Container)<IContainer>`
  padding-top: 3rem;

  @media screen and (min-width: 600px) {
    padding-top: 7rem;
  }
`
