import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
a {
  font-weight: 500;
  /* color: #646cff; */
  text-decoration: inherit;
}
a:hover {
  color: inherit;
}



h1 {
  font-size: 3.2em;
  line-height: 1.1;
}


`
