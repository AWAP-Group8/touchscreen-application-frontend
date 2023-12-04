import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';  // Add this line
import '@testing-library/jest-dom';



test('renders app component', () => {
  render(<App />);
  const headingElement = screen.getByText('Touch Screen Simulation');
  expect(headingElement).toBeInTheDocument();
});

