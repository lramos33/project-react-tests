import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing NotFound Component', () => {
  test('if there is a heading with certain text', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('if there is an image with certain src', () => {
    render(<NotFound />);
    const notFoundImage = screen.getByRole('img', { name: /pikachu crying/i });
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
