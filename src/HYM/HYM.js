import React, { useState } from 'react';
import ParcelLockerSelection from './ParcelLockerSelection';
import PickupOrDeliverySelection from './PickupOrDeliverySelection';
import ParcelLockerInterface from './ParcelLockerInterface';

function HYM() {
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleLockerSelect = (lockerNumber) => {
    setSelectedLocker(lockerNumber);
  };

  const handleSelection = (choice) => {
    setSelectedAction(choice);
  };

  const handleGoBack = () => {
    setSelectedAction(null);
    setSelectedLocker(null);
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #4CAF50',  // Green border
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F5F5F5',   // Light gray background
  };

  const headerStyle = {
    fontSize: '2em',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',  // Dark gray text color
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Touch Screen Simulation</h1>
      {!selectedLocker && !selectedAction && (
        <ParcelLockerSelection onSelectLocker={handleLockerSelect} />
      )}
      {selectedLocker && !selectedAction && (
        <PickupOrDeliverySelection
          onSelection={handleSelection}
          onGoBack={handleGoBack}
        />
      )}
      {selectedLocker && selectedAction && (
        <ParcelLockerInterface
          Locker={selectedLocker}
          action={selectedAction}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default HYM;
