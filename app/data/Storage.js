import { create } from 'zustand'

const useStore = create((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  getUserById: (id) => set((state) => state.users.find((user) => user.id === id)),
  getAllUsers: () => set((state) => state.users),

  vehicles: [],
  addVehicle: (vehicle) => set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
  getVehicleById: (id) => set((state) => state.vehicles.find((vehicle) => vehicle.id === id)),
  getVehiclesByUserId: (userId) => get().vehicles.filter((vehicle) => vehicle.userId === userId),

  refuells: [],
  addRefuell: (refuell) => set((state) => ({ refuells: [...state.refuells, refuell] })),
  getRefuellById: (id) => get().refuells.find((refuell) => refuell.id === id),
  getRefuellsByVehicleId: (vehicleId) => get().refuells.filter((refuell) => refuell.vehicleId === vehicleId),
  getAllRefuellsSortedById: () => [...get().refuells].sort((a, b) => b.id - a.id),
  getTop5RefuellsSortedById: () => [...get().refuells].sort((a, b) => b.id - a.id).slice(0, 5),
}));

export default useStore;