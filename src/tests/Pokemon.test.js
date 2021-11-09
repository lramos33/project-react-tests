import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

describe('Testing Pokemon Component', () => {
  const testedPokemon = data[0];

  test('if pokemon card is displayed', () => {
    renderWithRouter(<Pokemon pokemon={ testedPokemon } />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByText(/electric/i);
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = screen.getByText(/average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('if pokemon card has a "more details" link and if it works properly', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ testedPokemon } isFavorite />,
    );

    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /more details/i },
    );
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteImage = screen.getByRole(
      'img',
      { name: /pikachu is marked as favorite/i },
    );
    expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');
  });
});
