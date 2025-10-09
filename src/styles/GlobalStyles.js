import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body {
      margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
     font-family: "Inter", sans-serif;
     color: black;
     overflow: hidden;
}

     * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
  font-weight: 500;
  color: inherit;
  text-decoration: inherit;
}
a:hover {
  color: inherit;
}

ul {
  list-style: none;
}
/* &:hover {hover} */
`
