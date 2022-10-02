import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter, MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  it('Renders Products', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Products');
  });
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });
});
