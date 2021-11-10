import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing PokemonDetails Component', () => {
  test('if the detailed information is displayed', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const pokemonTitle = screen.getByText(/pikachu details/i);
    expect(pokemonTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    const summaryHeading = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summaryHeading).toBeInTheDocument();
    const pokemonSummary = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(pokemonSummary).toBeInTheDocument();
  });

  test('if there is maps about the pokemon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const locationHeading = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(locationHeading).toBeInTheDocument();
    const firstLocationTitle = screen.getByText(/kanto viridian forest/i);
    expect(firstLocationTitle).toBeInTheDocument();
    const secondLocationTitle = screen.getByText(/kanto power plant/i);
    expect(secondLocationTitle).toBeInTheDocument();
    const pokemonLocation = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(pokemonLocation).toHaveLength(2);
    expect(pokemonLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('if the user can favorite a pokemon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    const favoriteLabel = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favoriteLabel).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(false);
  });
});
