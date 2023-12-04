import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ParcelLockerSelection from './ParcelLockerSelection';

jest.mock('axios');

const mockedLockerData = {
  data: {
    data: {
      locker: [
        { value: 'A' },
        { value: 'B' },
        { value: 'C' },
      ],
    },
  },
};

describe('ParcelLockerSelection Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
  });

  test('renders locker buttons', async () => {
    // Mock the axios response
    axios.get.mockResolvedValueOnce(mockedLockerData);

    render(<ParcelLockerSelection onSelectLocker={() => {}} />);

    // Wait for the component to render and the axios call to resolve
    await screen.findAllByRole('button');

    // Assert that the correct number of buttons is rendered
    expect(screen.getAllByRole('button')).toHaveLength(mockedLockerData.data.data.locker.length);

    // Assert that each button is rendered with the correct text
    mockedLockerData.data.data.locker.forEach(lockerItem => {
      expect(screen.getByText(`Locker ${lockerItem.value}`)).toBeInTheDocument();
    });
  });

  test('handles locker selection', async () => {
    // Mock the axios response
    axios.get.mockResolvedValueOnce(mockedLockerData);

    // Mock the onSelectLocker function
    const onSelectLockerMock = jest.fn();

    render(<ParcelLockerSelection onSelectLocker={onSelectLockerMock} />);

    // Wait for the component to render and the axios call to resolve
    await screen.findAllByRole('button');

    // Simulate clicking on a locker button
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Assert that the onSelectLocker function is called with the correct argument
    expect(onSelectLockerMock).toHaveBeenCalledWith(mockedLockerData.data.data.locker[0].value);
  });
});
