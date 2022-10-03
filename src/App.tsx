import styled from 'styled-components';
import { AppRouter } from './router';

import GlobalStyle from './styles/globalStyle';

const Main = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

export default function App() {
  return (
    <Main>
      <GlobalStyle />
      <AppRouter />
    </Main>
  );
}
