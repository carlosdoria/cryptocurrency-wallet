import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  /* VARIABLE CSS */
  :root {
    --white: #fff;

    --gray-100: e1e1e6#;
    --gray-300: #a8a8b3;
    --gray-900: #121214;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93,75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87,5%;
    }
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    background: var(--gray-900);
    color: var(--white);
  }

  body, input, textarea, select, button {
    font: 400 1rem 'roboto';
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
