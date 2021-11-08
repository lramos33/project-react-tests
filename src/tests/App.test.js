import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App.js';


test('App Component', () => {
  render(<App />);

  const homeLink = screen.getAllByRole('link', { name: 'Home'});
  const aboutLink = screen.getAllByRole('link', { name: 'About'});
  const favoritePokemonsLink = screen.getAllByRole('link', { name: 'Favorite Pokémons'});
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokemonsLink).toBeInTheDocument();
});
