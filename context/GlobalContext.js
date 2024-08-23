import { create } from 'zustand';

// Create a store for the user
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
  homeVehicle: null,
  setHomeVehicle: (homeVehicle) => set({ homeVehicle: homeVehicle }),
  vehicleSelected: null,
  setVehicleSelected: (vehicle) => set({ vehicleSelected: vehicle }),
  vehicleForEdit: null,
  setVehicleForEdit: (vehicle) => set({ vehicleForEdit: vehicle }),
  refuelForEdit: null,
  setRefuelForEdit: (refuel) => set({ refuelForEdit: refuel }),
}));