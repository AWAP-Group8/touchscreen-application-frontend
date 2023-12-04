import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import HYM from './HYM';

test('renders Touch Screen Simulation heading', () => {
  render(<HYM />);
  const headingElement = screen.getByRole('heading', { name: /Touch Screen Simulation/i });
  expect(headingElement).toBeInTheDocument();
});

