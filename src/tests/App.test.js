import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing App Component', () => {
  // beforeEach(() => {
  //   const history = createMemoryHistory();
  //   render(<Router history={ history }><App /></Router>);
  // });

  test('if header has all the links', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('if clicking on "Home" redirects to pathname "/"', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    const aboutLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if clicking on "About" redirects to pathname "/about"', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if clicking on "Favorite Pokémons" redirects to pathname "/favorites"', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    const aboutLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if it redirects to a "Not Found" page', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    history.push('/invented-url');
    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
