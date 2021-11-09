import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Pokedex Component', () => {
  test('if there is a heading with certain text', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('if the next pokemon is displayed when the button is clicked', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    expect(pikachu).toBeInTheDocument();
  });

  test('if it only one pokemon is displayed at a time', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getAllByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveLength(1);
  });

  test('if pokedex has all the filter buttons', () => {
    renderWithRouter(<App />);

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const uniqueValuesLength = new Set(pokemonTypeButtons).size;
    expect(pokemonTypeButtons).toHaveLength(uniqueValuesLength);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);
    userEvent.click(nextPokemonButton);
    const secondFirePokemonName = screen.getByText(/rapidash/i);
    expect(secondFirePokemonName).toBeInTheDocument();

    const pokemonType = screen.getAllByText(/fire/i);
    expect(pokemonType).toHaveLength(2);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });

  test('if pokedex has a reset filter button', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });
});
