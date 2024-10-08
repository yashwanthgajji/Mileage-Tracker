import AsyncStorage from '@react-native-async-storage/async-storage';

const VEHICLE_STORAGE_KEY = 'VEHICLES';

export const addVehicle = async (vehicle) => {
  try {
    const vehiclesString = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
    let vehicles = [];
    if (vehiclesString) {
      vehicles = JSON.parse(vehiclesString);
    }
    vehicles.push(vehicle);
    await AsyncStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(vehicles));
    console.log('Vehicle added successfully!');
  } catch (error) {
    console.error('Error adding vehicle:', error);
  }
};

export const getVehicleById = async (id) => {
  try {
    // Retrieve the vehicles array from AsyncStorage
    const vehiclesString = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
    let vehicles = [];
    if (vehiclesString) {
      vehicles = JSON.parse(vehiclesString);
      const vehicle = vehicles.find((vehicle) => vehicle.id === id);
      return vehicle || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting vehicle:', error);
    return null;
  }
};

export const getAllVehiclesByUserId = async (userId) => {
  try {
    const vehiclesString = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
    if (vehiclesString) {
      let vehicles = JSON.parse(vehiclesString);
      const userVehicles = vehicles.filter((vehicle) => vehicle.userId === userId);
      return userVehicles.sort((a, b) => b.id - a.id);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting all vehicles by user ID:', error);
    return [];
  }
};

export const getAllVehicles = async () => {
  try {
    const vehiclesString = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
    if (vehiclesString) {
      let vehicles = JSON.parse(vehiclesString);
      return vehicles;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting all vehicles by user ID:', error);
    return [];
  }
}

export const updateVehicle = async (vehicleId, updatedVehicle) => {
  try {
    const vehiclesString = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
    if (vehiclesString) {
      let vehicles = JSON.parse(vehiclesString);
      const index = vehicles.findIndex((vehicle) => vehicle.id === vehicleId);
      if (index !== -1) {
        vehicles[index] = updatedVehicle;
        await AsyncStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(vehicles));
        console.log('Vehicle updated successfully!');
      } else {
        console.error('Vehicle not found');
        return null;
      }
    } else {
      console.error('No vehicles found');
      return null;
    }
  } catch (error) {
    console.error('Error updating vehicle:', error);
  }
};

export const deleteVehicleById = async (id) => {
  try {
    const vehiclesString = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
    if (vehiclesString) {
      let vehicles = JSON.parse(vehiclesString);
      const index = vehicles.findIndex((vehicle) => vehicle.id === id);
      if (index !== -1) {
        vehicles.splice(index, 1);
        await AsyncStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(vehicles));
        console.log('Vehicle deleted successfully!');
        return true;
      } else {
        console.error('Vehicle not found');
        return false;
      }
    } else {
      console.error('No vehicles found');
      return false;
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return false;
  }
};