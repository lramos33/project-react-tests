import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing App Component', () => {
  test('if header has all the links', () => {
    renderWithRouter(<App />);

    const allLinks = screen.getAllByRole('link');
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBe(allLinks[0]);
    expect(aboutLink).toBe(allLinks[1]);
    expect(favoritePokemonsLink).toBe(allLinks[2]);
  });

  test('if clicking on "Home" redirects to pathname "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if clicking on "About" redirects to pathname "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if clicking on "Favorite Pokémons" redirects to pathname "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if it redirects to a "Not Found" page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/invented-url');
    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
