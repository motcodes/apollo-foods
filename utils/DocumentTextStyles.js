import styled from 'styled-components'

export const DocumentTextStyles = styled.div`
  && {
    max-width: 800px;
    margin: 0 auto 4rem;
    h1,
    h2,
    h3 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    h4,
    h5,
    h6 {
      margin-bottom: 0.5rem;
    }
    p {
      display: block;
    }

    a,
    a:visited {
      color: var(--blue-80);
    }

    ul {
      margin-left: 1.5rem;
      font-family: ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      li {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
    }
  }
`
