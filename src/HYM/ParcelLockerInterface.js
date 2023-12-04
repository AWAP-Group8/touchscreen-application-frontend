import React, { useState } from 'react';
import axios from 'axios';
import config from './config';

// Numeric keypad component
function NumericKeypad({ onDigitClick, onDeleteClick }) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const keypadStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '5px',
    width: '50%', // Set the total width to be 50% of the container
    margin: '0 auto', // Center the keypad
  };

  const buttonStyle = {
    padding: '8px', // Adjusted padding for narrower buttons
    fontSize: '1.3em', // Adjusted font size
    backgroundColor: 'blue', // Green background
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    gridColumn: 'span 2', // Make the button span 2 columns
  };
  const [pressedButton, setPressedButton] = useState(null);

  const handleButtonDown = (digit) => {
    setPressedButton(digit);
  };

  const handleButtonUp = () => {
    setPressedButton(null);
  };
  return (
    <div style={keypadStyle}>
      {digits.map((digit) => (
        <button
          key={digit}
          onClick={() => onDigitClick(digit)}
          onMouseDown={() => handleButtonDown(digit)}
          onMouseUp={handleButtonUp}
          onMouseLeave={handleButtonUp}
          style={{
            ...buttonStyle,
            backgroundColor: pressedButton === digit ? 'blue' : '#4CAF50',
          }}
        >
          {digit}
        </button>
      ))}
      <button
        onClick={onDeleteClick}
        onMouseDown={() => handleButtonDown('Delete')}
        onMouseUp={handleButtonUp}
        onMouseLeave={handleButtonUp}
        style={{
          ...deleteButtonStyle,
          backgroundColor: pressedButton === 'Delete' ? 'blue' : '#4CAF50',
        }}
      >
        Delete
      </button>
    </div>
  );
}

function ParcelLockerInterface({ Locker, action, onGoBack }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [showCloseDoorButton, setShowCloseDoorButton] = useState(false);
  const [pickupButtonClicked, setPickupButtonClicked] = useState(false);
  const [pickupPressed, setPickupPressed] = useState(false);
  const [homePressed, setHomePressed] = useState(false);
  const [lockerCabinet, setLockerCabinet] = useState(null);

  const inputStyle = {
    margin: '10px 0',
    padding: '8px',
    fontSize: '1em',
    width: '30%',
  };

  const buttonStyle = {
    margin: '10px 5px',
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Add a smooth transition on background color
  };

  const closeButtonStyle = {
    margin: '10px 5px',
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Add a smooth transition on background color
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleDigitClick = (digit) => {
    setCode((prevCode) => prevCode + digit.toString());
  };

  const handleDeleteClick = () => {
    setCode((prevCode) => prevCode.slice(0, -1));
  };

  const handleAction = () => {
    // if (action === 'pickup') {
    //   axios.post(`${config.backendUrl}/pickupParcel`, {
    //     pickupLocker: Locker,
    //     pickupCode: code
    //   })
    //   .then(response => {
    //     if (response.data.success) {
    //       setMessage(response.data.message);
    //       setShowCloseDoorButton(true);
    //       setPickupButtonClicked(true); // Set the state to indicate the button is clicked
    //     } else {
    //       // setMessage('Pick up code is not available');
    //       setMessage(response.data.message);
    //       setShowCloseDoorButton(false);
    //     }
    //   })
    //   .catch(error => {
    //     setMessage('Error processing the request');
    //     setShowCloseDoorButton(false);
    //     console.error('Error:', error);
    //   });
    // } 
    if (action === 'pickup') {
      axios.get(`${config.backendUrl}/pickupParcel`, {
        params: {
          pickupLocker: Locker,
          pickupCode: code
        }
      })
      .then(response => {
        console.log(response.data.succees)
        if (response.data.succees) {
          setMessage(response.data.msg); // Use response.data.msg instead of response.data.message
          setShowCloseDoorButton(true);
          setPickupButtonClicked(true); // Set the state to indicate the button is clicked
          setLockerCabinet(response.data.data.cabinet); 
        } else {
          setMessage(response.data.msg); // Use response.data.msg instead of response.data.message
          setShowCloseDoorButton(false);
        }
      })
      .catch(error => {
        setMessage('Error processing the request');
        setShowCloseDoorButton(false);
        console.error('Error:', error);
      });
    }
    // else if (action === 'delivery') {
    //   axios.post(`${config.backendUrl}/sendParcel`, {
    //     sendLocker: Locker,
    //     sendCode: code
    //   })
    //   .then(response => {
    //     if (response.data.succees) {
    //       setMessage(response.data.message);
    //       setShowCloseDoorButton(true);
    //       setPickupButtonClicked(true); // Set the state to indicate the button is clicked
    //     } else {
    //       // setMessage('Send code is not available');
    //       setMessage(response.data.message);
    //       setShowCloseDoorButton(false);
    //     }
    //   })
    //   .catch(error => {
    //     setMessage('Error processing the request');
    //     setShowCloseDoorButton(false);
    //     console.error('Error:', error);
    //   });
    // }
    else if (action === 'delivery') {
      axios.get(`${config.backendUrl}/sendParcel`, {
        params: {
          pickupLocker: Locker,
          pickupCode: code
        }
      })
      .then(response => {
        if (response.data.succees) {
          setMessage(`DOOR ${response.data.data.cabinet} OPEN FOR DROP OFF`);
          setShowCloseDoorButton(true);
          setPickupButtonClicked(true); // Set the state to indicate the button is clicked
          setLockerCabinet(response.data.data.cabinet); 
        } else {
          // setMessage('Send code is not available');
          setMessage(response.data.msg);
          setShowCloseDoorButton(false);
        }
      })
      .catch(error => {
        setMessage('Error processing the request');
        setShowCloseDoorButton(false);
        console.error('Error:', error);
      });
    }

  };

  const handleCloseDoor = () => {
    setShowCloseDoorButton(false);
    setMessage('Door was closed');
    setCode('');
    if (action === 'pickup') {
      // Sending HTTP request to close the cabinet door
      axios.post(`${config.backendUrl}/closeCabinetDoorPickup`, {
        pickupLocker: Locker,
        pickupCabinet: lockerCabinet 
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error while closing door:', error);
        });
    } 
    else if (action === 'delivery') {
      // Sending HTTP request to close the cabinet door
      axios.post(`${config.backendUrl}/closeCabinetDoorSend`, {
        pickupLocker: Locker,
        pickupCabinet: lockerCabinet 
      })
      .then(response => {
      })
      .catch(error => {
        console.error('Error while closing door:', error);
      });
    }
  };

  const handleGoBack = () => {
    onGoBack();
  };

  return (
    <div>
      <h2>Please Enter the {action === 'pickup' ? 'Pickup' : 'Send'} code.</h2>
      <h3>You are at Locker {Locker}.</h3>
      <label htmlFor="codeInput">Enter Code:</label>
      <input type="text" id="codeInput" value={code} onChange={handleCodeChange} style={inputStyle} />
      <NumericKeypad onDigitClick={handleDigitClick} onDeleteClick={handleDeleteClick} />
      {!pickupButtonClicked && (
        <button
          onClick={handleAction}
          onMouseDown={() => setPickupPressed(true)} // Set pressed state for Pickup button
          onMouseUp={() => setPickupPressed(false)} // Reset pressed state for Pickup button
          onMouseLeave={() => setPickupPressed(false)} // Reset pressed state for Pickup button
          style={{
            ...buttonStyle,
            backgroundColor: pickupPressed ? 'blue' : '#4CAF50',
          }}
        >
          {action === 'pickup' ? 'pickup' : 'send'}
        </button>
      )}
      {showCloseDoorButton && (
        <button
          onClick={handleCloseDoor}
          onMouseDown={() => setHomePressed(true)} // Set pressed state for Home Page button
          onMouseUp={() => setHomePressed(false)} // Reset pressed state for Home Page button
          onMouseLeave={() => setHomePressed(false)} // Reset pressed state for Home Page button
          style={{
            ...closeButtonStyle,
            backgroundColor: homePressed ? 'blue' : '#f44336',
          }}
        >
          Please Close the Door
        </button>
      )}
      <button
        onClick={handleGoBack}
        onMouseDown={() => setHomePressed(true)} // Set pressed state for Home Page button
        onMouseUp={() => setHomePressed(false)} // Reset pressed state for Home Page button
        onMouseLeave={() => setHomePressed(false)} // Reset pressed state for Home Page button
        style={{
          ...buttonStyle,
          backgroundColor: homePressed ? 'blue' : '#4CAF50',
        }}
      >
        HomePage
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ParcelLockerInterface;
