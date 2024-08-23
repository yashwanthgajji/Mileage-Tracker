import AsyncStorage from '@react-native-async-storage/async-storage';

const REFUEL_STORAGE_KEY = 'REFUELS';

export const addRefuel = async (refuel) => {
  try {
    const refuelsString = await AsyncStorage.getItem(REFUEL_STORAGE_KEY);
    let refuels = [];
    if (refuelsString) {
      refuels = JSON.parse(refuelsString);
    }
    refuels.push(refuel);
    await AsyncStorage.setItem(REFUEL_STORAGE_KEY, JSON.stringify(refuels));
    console.log('Refuel added successfully!');
  } catch (error) {
    console.error('Error adding refuel:', error);
  }
};

export const getRefuelById = async (id) => {
  try {
    // Retrieve the refuels array from AsyncStorage
    const refuelsString = await AsyncStorage.getItem(REFUEL_STORAGE_KEY);
    let refuels = [];
    if (refuelsString) {
      refuels = JSON.parse(refuelsString);
      const refuel = refuels.find((refuel) => refuel.id === id);
      return refuel || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting refuel:', error);
    return null;
  }
};

export const getAllRefuelsByVehicleId = async (vehicleId) => {
    try {
      const refuelsString = await AsyncStorage.getItem(REFUEL_STORAGE_KEY);
      if (refuelsString) {
        let refuels = JSON.parse(refuelsString);
        const vehicleRefuels = refuels.filter((refuel) => refuel.vehicleId === vehicleId);
        return vehicleRefuels.sort((a, b) => b.id - a.id);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting all refuels by vehicle ID:', error);
      return [];
    }
};

export const getTop5RefuelsByVehicleId = async (vehicleId) => {
    try {
      const refuelsString = await AsyncStorage.getItem(REFUEL_STORAGE_KEY);
      if (refuelsString) {
        let refuels = JSON.parse(refuelsString);
        const vehicleRefuels = refuels.filter((refuel) => refuel.vehicleId === vehicleId);
        return vehicleRefuels.sort((a, b) => b.id - a.id).slice(0, 5); // Sort in descending order of refuel IDs and take top 5
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting top 5 refuels by vehicle ID:', error);
      return [];
    }
};

export const getAllRefuels = async () => {
  try {
    const refuelsString = await AsyncStorage.getItem(REFUEL_STORAGE_KEY);
    if (refuelsString) {
      let refuels = JSON.parse(refuelsString);
      return refuels
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting top 5 refuels by vehicle ID:', error);
    return [];
  }
};