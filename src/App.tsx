import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<div>Sample</div>} />
        <Route path="product/:productId" element={<div>Sample</div>} />
        <Route path="sales" element={<div>Sample</div>} />
        <Route path="sales/:saleId" element={<div>Sample</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Main>
  );
}
