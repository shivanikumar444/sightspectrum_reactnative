# Description:
This is a React Native mobile app that allows users to create accounts. It connects to the Spring Boot backend to save user information. The app validates input data and manages state using Redux.

## Prerequisites:
```
Node.js (16.x or later) and npm (installed with Node.js)
React Native CLI or Expo CLI
Android Studio (for Android development) or Xcode (for iOS development)
Java JDK (required for Android development)
```
## Setup Instructions:
### Clone the Repository:
```
git clone https://github.com/shivanikumar444/sightspectrum_reactnative.git
cd sightspectrum_reactnative
```
### Install Dependencies:
```
npm install
```
### Configure Backend API URL:

```javascript
export const API_URL = 'http://localhost:8080/api/accounts';
Replace 'http://localhost:8080' with the correct IP if testing on a physical device. For example, use your machine's local network IP address.
```
### Start the React Native App:

For iOS (on macOS):
```npx react-native run-ios```
For Android:
```npx react-native run-android```
If using Expo:
```npx expo start```

### Features:
* Create an account by entering name, email, and password.
* Input validation for all fields:
* Name: required, max length 50.
* Email: required, valid email format.
* Password: required, at least 8 characters, only letters and numbers.

### Connects to the Spring Boot backend for account creation.
### Testing the Application:
```
Run the Backend: Make sure the Spring Boot backend is running on http://localhost:8080.
Run the React Native App: Ensure that the React Native app is pointing to the correct backend URL.
```

### Create an Account:
* Open the app.
* Enter the details (name, email, password).
* Click the Create Account button.
* Verify in Postman or H2 Console:
* Use Postman or the H2 database console to verify that the account was created in the backend.
