import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Make sure to include this line
import PickupOrDeliverySelection from './PickupOrDeliverySelection';

test('renders Choose options and buttons', () => {
  // Mock functions
  const mockOnSelection = jest.fn();
  const mockOnGoBack = jest.fn();

  // Render the component with mock functions
  render(
    <PickupOrDeliverySelection onSelection={mockOnSelection} onGoBack={mockOnGoBack} />
  );

  // Check if the buttons are present
  const sendParcelButton = screen.getByRole('button', { name: /Send parcel/i });
  const pickUpParcelButton = screen.getByRole('button', { name: /Pick Up parcel/i });
  const homePageButton = screen.getByRole('button', { name: /Home Page/i });

  // Trigger button clicks
  fireEvent.click(sendParcelButton);
  fireEvent.click(pickUpParcelButton);
  fireEvent.click(homePageButton);

  // Check if the mock functions were called with the expected arguments
  expect(mockOnSelection).toHaveBeenCalledWith('delivery');
  expect(mockOnSelection).toHaveBeenCalledWith('pickup');
  expect(mockOnGoBack).toHaveBeenCalledTimes(1);
});
