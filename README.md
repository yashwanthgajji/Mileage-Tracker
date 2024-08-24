# Mileage Tracker 

**Autor**: Yashwanth Gajji

## About

The Mileage Tracker application is a comprehensive tool designed for users to efficiently manage and track their vehicles' performance and fuel consumption. Users can securely sign up and log in to maintain their profiles, add and manage vehicle details, and record refuelling data. The app offers dynamic visualizations of monthly mileage, expenditures, and performance metrics, providing insights into driving habits and costs. All user data is stored locally using Async Storage, with Zustand handling global state management for a seamless experience.

### Features
- Users can sign up and log in using a secure 4-digit passcode.
- Upon signing in, users can view their profile on the sign-in page.
- Users have the ability to add, edit, and delete vehicle details.
- Vehicle images can be uploaded and managed within the application.
- All vehicles are accessible in the "Vehicles" tab.
- Users can add, edit, and view refuelling data for each vehicle in the "Refuelling" tab.
- The application provides dynamic visualizations of monthly mileage performance, monthly expenditures, average mileage, and the most recent mileage.
- All data is stored locally using Async Storage for efficient access and retrieval.
- Zustand is utilized for global state management across the application.

### Technologies Used
- React Native
- Expo
- NativeWind
- AysncStorage
- Zustand

### Other Libraries Used
- react-native-chart-kit
- expo-image-picker
- @react-native-async-storage/async-storage
- zustand
- react-native-otp-textinput
- react-native-dropdown-select-list

## Geting started

1. Download the Zip or  Clone the repository.

2. Install dependencies
   ```bash
   npm install
   ```
3. Run the Application
   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a
- [Expo Go](https://expo.dev/go), Easy and Preferable way
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

## Screenshots
### Authentication Screens
<img src="screenshots/auth/splash.jpg" width="200">&emsp;&emsp;<img src="screenshots/auth/index.jpg" width="200">&emsp;&emsp;<img src="screenshots/auth/signup1.jpg" width="200">

<img src="screenshots/auth/avatarselection.jpg" width="200">&emsp;&emsp;<img src="screenshots/auth/registerpasscode.jpg" width="200">&emsp;&emsp;<img src="screenshots/auth/signin.jpg" width="200">

<img src="screenshots/auth/passcode.jpg" width="200">

### Home Screeens
<img src="screenshots/home/home1.jpg" width="200">&emsp;&emsp;<img src="screenshots/home/home2.jpg" width="200">&emsp;&emsp;<img src="screenshots/home/home3.jpg" width="200">

<img src="screenshots/home/home4.jpg" width="200">&emsp;&emsp;<img src="screenshots/home/profile.jpg" width="200">

### Refuel and Performance Screens
<img src="screenshots/refuel/refuelling1.jpg" width="200">&emsp;&emsp;<img src="screenshots/refuel/refuelling2.jpg" width="200">&emsp;&emsp;<img src="screenshots/refuel/refuelling3.jpg" width="200">

<img src="screenshots/refuel/editrefuel.jpg" width="200">&emsp;&emsp;<img src="screenshots/refuel/performance1.jpg" width="200">&emsp;&emsp;<img src="screenshots/refuel/performance2.jpg" width="200">

### Vehicle Screens
<img src="screenshots/vehicles/vehicles1.jpg" width="200">&emsp;&emsp;<img src="screenshots/vehicles/vehicles2.jpg" width="200">&emsp;&emsp;<img src="screenshots/vehicles/vehicles3.jpg" width="200">

<img src="screenshots/vehicles/vehicles4.jpg" width="200">&emsp;&emsp;<img src="screenshots/vehicles/newvehicle1.jpg" width="200">&emsp;&emsp;<img src="screenshots/vehicles/newvehicle2.jpg" width="200">

<img src="screenshots/vehicles/editvehicle1.jpg" width="200">&emsp;&emsp;<img src="screenshots/vehicles/editvehicle2.jpg" width="200">
