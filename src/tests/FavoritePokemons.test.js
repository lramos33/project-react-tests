import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testing FavoritePokemons Component', () => {
  test('if it says "No favorite pokemon found" if there is no favorite pokemons', () => {
    render(<FavoritePokemons />);
    const notFoundMessage = screen.getByText(/no favorite pokemon found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('if it contains the favorite pokemons', () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><App /></Router>);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonLink);
    const favoritePokemonName = screen.getByText(/pikachu/i);
    expect(favoritePokemonName).toBeInTheDocument();
  });
});
