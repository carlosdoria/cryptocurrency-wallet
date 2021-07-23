import styled from 'styled-components'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

export const Header = styled(CardHeader)`
  background: #e1bb04;

  span {
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
`

export const CardContainer = styled(CardContent)`
  margin: 5px 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.2rem;
  }
  `
