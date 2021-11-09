import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testing About Component', () => {
  test('if it contains a heading with text "About Pokédex"', () => {
    render(<About />);
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('if it contains two paragraphs', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/this application simulates a pokédex/i);
    const secondParagraph = screen.getByText(/one can filter pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('if it contains an image', () => {
    render(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
