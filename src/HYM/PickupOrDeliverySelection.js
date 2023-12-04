import React, { useState } from 'react';

function PickupOrDeliverySelection({ onSelection, onGoBack }) {
  const [pressedButton, setPressedButton] = useState(null); // Track the pressed button

  const buttonStyle = {
    margin: '10px 5px',
    padding: '10px',
    fontSize: '1em',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Add transition for a smooth animation
  };

  const handleSelection = (choice) => {
    onSelection(choice);
  };

  const handleGoBack = () => {
    onGoBack();
  };

  return (
    <div>
      <h2>"Send parcel" or "Pick Up parcel".</h2>
      <button
        onClick={() => handleSelection('delivery')}
        onMouseDown={() => setPressedButton('delivery')}
        onMouseUp={() => setPressedButton(null)}
        onMouseLeave={() => setPressedButton(null)}
        style={{
          ...buttonStyle,
          backgroundColor: pressedButton === 'delivery' ? 'blue' : '#4CAF50', // Change background color on press
        }}
      >
        Send parcel
      </button>
      <button
        onClick={() => handleSelection('pickup')}
        onMouseDown={() => setPressedButton('pickup')}
        onMouseUp={() => setPressedButton(null)}
        onMouseLeave={() => setPressedButton(null)}
        style={{
          ...buttonStyle,
          backgroundColor: pressedButton === 'pickup' ? 'blue' : '#4CAF50', // Change background color on press
        }}
      >
        Pick Up parcel
      </button>
      <button
        onClick={handleGoBack}
        onMouseDown={() => setPressedButton('home')}
        onMouseUp={() => setPressedButton(null)}
        onMouseLeave={() => setPressedButton(null)}
        style={{
          ...buttonStyle,
          backgroundColor: pressedButton === 'home' ? 'blue' : '#4CAF50', // Change background color on press
        }}
      >
        Home Page
      </button>
    </div>
  );
}

export default PickupOrDeliverySelection;
