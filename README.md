# Touch Screen Simulation Application

This React application simulates a touch screen interface for interacting with parcel lockers. The application includes three main components: `HYM`, `ParcelLockerInterface`, and `ParcelLockerSelection`. Additionally, there are two sub-components: `NumericKeypad` and `PickupOrDeliverySelection`.

## 1. HYM Component

The `HYM` component serves as the main entry point for the touch screen simulation. It orchestrates the flow of the application, allowing users to select a parcel locker, choose between pickup or delivery, and perform various actions.

### State Management

- `selectedLocker`: Stores the number of the selected parcel locker.
- `selectedAction`: Stores the user's choice between pickup and delivery.

### Functions

1. `handleLockerSelect(lockerNumber)`: Updates the state with the selected parcel locker number.
2. `handleSelection(choice)`: Updates the state with the user's choice between pickup and delivery.
3. `handleGoBack()`: Resets the state, allowing the user to go back to the initial state.

### Styles

- `containerStyle`: Defines styling for the main container.
- `headerStyle`: Defines styling for the header.

## 2. ParcelLockerInterface Component

The `ParcelLockerInterface` component represents the interface for the selected locker and action. It provides input for code entry, numeric keypad, action buttons, and controls for closing the locker door.

### State Management

- `code`: Holds the input code provided by the user.
- `message`: Displays messages based on user actions or server responses.
- `showCloseDoorButton`: Determines whether to display the "Close the Door" button.
- `pickupButtonClicked`: Indicates if the pickup or delivery button has been clicked.
- `pickupPressed` and `homePressed`: Track the pressed state of the Pickup and HomePage buttons.
- `lockerCabinet`: Stores the locker cabinet number for subsequent operations.

### Functions

1. `handleCodeChange(event)`: Updates the state with the entered code.
2. `handleDigitClick(digit)`: Appends the clicked digit to the code.
3. `handleDeleteClick()`: Removes the last digit from the code.
4. `handleAction()`: Initiates the pickup or delivery action based on user input and updates the state accordingly.
5. `handleCloseDoor()`: Closes the locker door, triggers an HTTP request, and updates the state.
6. `handleGoBack()`: Navigates back to the previous interface.

### Styles

- `inputStyle`: Defines styling for the code input field.
- `buttonStyle`: Defines styling for action buttons.
- `closeButtonStyle`: Defines styling for the "Close the Door" button.

## 3. ParcelLockerSelection Component

The `ParcelLockerSelection` component allows users to select a locker from the available options. It fetches the locker numbers from the backend and presents them as clickable buttons for selection.

### State Management

- `lockerNumbers`: Stores the array of available locker numbers.
- `pressedButton`: Keeps track of the currently pressed button for a smoother user experience.

### Functions

1. `handleLockerSelect(lockerNumber)`: Calls the `onSelectLocker` callback with the selected locker number when a button is clicked.

### Styles

- `buttonStyle`: Defines styling for the locker selection buttons. It includes margin, padding, font size, color, border, border radius, cursor, and transition for a smooth background color change.

## 4. NumericKeypad Component

The `NumericKeypad` component represents a numeric keypad for code entry. It includes digit buttons and a delete button for code manipulation.

### State Management

- `pressedButton`: Keeps track of the currently pressed button for a smoother user experience.

### Functions

1. `handleButtonDown(digit)`: Sets the pressed state when a digit button is pressed.
2. `handleButtonUp()`: Resets the pressed state when a button is released.

### Styles

- `keypadStyle`: Defines styling for the numeric keypad.
- `buttonStyle`: Defines styling for digit buttons.
- `deleteButtonStyle`: Defines styling for the delete button.

## 5. PickupOrDeliverySelection Component

The `PickupOrDeliverySelection` component allows users to choose between sending a parcel and picking up a parcel. It provides buttons for each option and a button to navigate back to the home page.

### State Management

- `pressedButton`: Keeps track of the currently pressed button for a smoother user experience.

### Functions

1. `handleSelection(choice)`: Calls the `onSelection` callback with the selected choice when a button is clicked.
2. `handleGoBack()`: Calls the `onGoBack` callback when the "Home Page" button is clicked.

### Styles

- `buttonStyle`: Defines styling for the selection buttons. It includes margin, padding, font size, color, border, border radius, cursor, and transition for a smooth background color change.

## Backend Integration

The application communicates with a backend API to perform actions such as fetching locker numbers, pickup, delivery, and closing the locker door. Ensure that the `config.backendUrl` is correctly configured to point to the backend API.
