import styled from 'styled-components'
import Container from '@material-ui/core/Container'

interface IContainer {
  component: string
}

export const Wrapper = styled(Container)<IContainer>`
  padding: 3rem 0;

  @media screen and (min-width: 600px) {
    padding: 7rem 0;

  }
`
