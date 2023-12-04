import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ParcelLockerInterface from '../../src/HYM/ParcelLockerInterface';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');

jest.setTimeout(15000); // Set a global timeout for all tests

describe('ParcelLockerInterface', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockApiResponse = {
    data: { success: true, msg: 'Parcel picked up', data: { cabinet: 'A1' } },
  };

  test('handles pickup action', async () => {
    // Mock the axios.get method for pickup action
    axios.get.mockResolvedValueOnce(mockApiResponse);

    render(<ParcelLockerInterface Locker={1} action="pickup" onGoBack={() => {}} />);

    // Click digit buttons
    fireEvent.click(screen.getByText('1'));

    // Use act to wait for state changes
    await act(async () => {
      fireEvent.click(screen.getByText('pickup'));
    });

    // Wait for the component to update based on the mocked API response
    await waitFor(() => {
      expect(screen.getByText('Parcel picked up')).toBeInTheDocument();
    });
  });
});
