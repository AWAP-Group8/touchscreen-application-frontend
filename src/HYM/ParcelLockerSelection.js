import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';

function ParcelLockerSelection({ onSelectLocker }) {
  const [lockerNumbers, setLockerNumbers] = useState([]);
  const [pressedButton, setPressedButton] = useState(null); // Track the pressed button

  // useEffect(() => {
  //   // Fetch locker numbers from the backend
  //   axios.get(`${config.backendUrl}/getLocker`)
  //     .then(response => {
  //       setLockerNumbers(response.data);
  //     })
  //     .catch(error => {
  //       // Handle error, set default locker numbers
  //       console.error('Error fetching locker numbers:', error);
  //       setLockerNumbers(['A']); // Set default locker numbers in case of an error
  //     });
  // }, []);
  useEffect(() => {
    // Fetch locker numbers from the backend
    axios.get(`${config.backendUrl}/getLocker`)
      .then(response => {
        const lockerData = response.data.data.locker; // Access locker array from the response
        const lockerNumbers = lockerData.map(lockerItem => lockerItem.value); // Map to extract values
  
        setLockerNumbers(lockerNumbers);
      })
      .catch(error => {
        // Handle error, set default locker numbers
        console.error('Error fetching locker numbers:', error);
        setLockerNumbers(['A']); // Set default locker numbers in case of an error
      });
  }, []);
  
  const buttonStyle = {
    margin: '5px',
    padding: '10px',
    fontSize: '1em',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Add transition for a smooth animation
    backgroundColor: pressedButton === 'all' ? '#45a049' : '#4CAF50', // Change background color on press
  };

  const handleLockerSelect = (lockerNumber) => {
    onSelectLocker(lockerNumber);
  };

  return (
    <div>
      <h2>Select Locker</h2>
      {lockerNumbers.map(lockerNumber => (
        <button
          key={lockerNumber}
          onClick={() => handleLockerSelect(lockerNumber)}
          onMouseDown={() => setPressedButton(lockerNumber)}
          onMouseUp={() => setPressedButton(null)}
          onMouseLeave={() => setPressedButton(null)}
          style={{
            ...buttonStyle,
            backgroundColor: pressedButton === lockerNumber ? 'blue' : '#4CAF50',
          }}
        >
          Locker {lockerNumber}
        </button>
      ))}
    </div>
  );
}

export default ParcelLockerSelection;
