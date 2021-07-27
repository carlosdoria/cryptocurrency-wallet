import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

interface IContainer {
  component: string
}

export const Wrapper = styled(Container)<IContainer>`
  padding-top: 3rem;

  @media screen and (min-width: 600px) {
    padding-top: 7rem;
  }
`

export const Details = styled(Grid)`
  padding-bottom: 3rem;

  @media screen and (min-width: 600px) {
    padding-bottom: 7rem;
  }
`
