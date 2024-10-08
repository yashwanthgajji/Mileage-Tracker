import { addVehicle, getAllVehicles, getAllVehiclesByUserId, getVehicleById, updateVehicle, deleteVehicleById } from '../data/VehicleStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Vehicle Storage', () => {
    beforeEach(() => {
        AsyncStorage.getItem.mockClear();
        AsyncStorage.setItem.mockClear();
    });

    describe('addVehicle', () => {
        it('adds a new vehicle to the storage', async () => {
            const vehicle = { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', enginer: 1000 };
            await addVehicle(vehicle);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('VEHICLES', JSON.stringify([vehicle]));
        });
      
        it('adds a new vehicle to the existing vehicles in storage', async () => {
            const existingVehicles = [{ id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', enginer: 1000 }];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingVehicles));
            const vehicle = { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', enginer: 300 };
            await addVehicle(vehicle);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('VEHICLES', JSON.stringify([...existingVehicles, vehicle]));
        });
    });

    describe('getVehicleById', () => {
        it('returns a vehicle by id', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', enginer: 1000 },
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', enginer: 300 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const vehicle = await getVehicleById(1);
            expect(vehicle).toEqual(vehicles[0]);
        });
      
        it('returns null if vehicle is not found', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', enginer: 1000 },
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', enginer: 300 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const vehicle = await getVehicleById(3);
            expect(vehicle).toBeNull();
        });
      
        it('returns null if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const vehicle = await getVehicleById(1);
            expect(vehicle).toBeNull();
        });
    });

    describe('getAllVehiclesByUserId', () => {
        it('returns all vehicles for a user', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', engine: 300 },
                { id: 3, userId: 2, name: 'Honda', type: '4 Wheeler', engine: 1500 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const userVehicles = await getAllVehiclesByUserId(1);
            expect(userVehicles).toEqual([
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', engine: 300 },
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
            ]);
        });
      
        it('returns an empty array if no vehicles are found for the user', async () => {
            const vehicles = [
                { id: 1, userId: 2, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
                { id: 2, userId: 2, name: 'RX100', type: '2 Wheeler', engine: 300 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const userVehicles = await getAllVehiclesByUserId(1);
            expect(userVehicles).toEqual([]);
        });
      
        it('returns an empty array if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const userVehicles = await getAllVehiclesByUserId(1);
            expect(userVehicles).toEqual([]);
        });
    });

    describe('getAllVehicles', () => {
        it('returns all vehicles from storage', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', engine: 300 },
                { id: 3, userId: 2, name: 'Honda', type: '4 Wheeler', engine: 1500 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const allVehicles = await getAllVehicles();
            expect(allVehicles).toEqual(vehicles);
        });
      
        it('returns an empty array if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const allVehicles = await getAllVehicles();
            expect(allVehicles).toEqual([]);
        });
    });
    
    describe('updateVehicle', () => {
        it('updates a vehicle in storage', async () => {
            const vehicle1 = { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 };
            const vehicle2 = { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', engine: 300 };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([vehicle1, vehicle2]));
            const updatedVehicle = { id: 1, userId: 1, name: 'Toyota Updated', type: '4 Wheeler', engine: 1200 };
            await updateVehicle(1, updatedVehicle);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('VEHICLES', JSON.stringify([updatedVehicle, vehicle2]));
        });
      
        it('returns null if no vehicle with the matching id is found', async () => {
            const vehicle1 = { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([vehicle1]));
            const updatedVehicle = { id: 2, userId: 1, name: 'RX100 Updated', type: '2 Wheeler', engine: 350 };
            const result = await updateVehicle(2, updatedVehicle);
            expect(result).toBeNull();
        });
      
        it('returns null if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const updatedVehicle = { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 };
            const result = await updateVehicle(1, updatedVehicle);
            expect(result).toBeNull();
        });
    });

    describe('deleteVehicleById', () => {
        it('deletes a vehicle by ID', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', engine: 300 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            await deleteVehicleById(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('VEHICLES', JSON.stringify([vehicles[1]]));
        });
      
        it('returns true if vehicle is deleted successfully', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
                { id: 2, userId: 1, name: 'RX100', type: '2 Wheeler', engine: 300 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const result = await deleteVehicleById(1);
            expect(result).toBe(true);
        });
      
        it('returns false if no vehicle with the matching ID is found', async () => {
            const vehicles = [
                { id: 1, userId: 1, name: 'Toyota', type: '4 Wheeler', engine: 1000 },
            ];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(vehicles));
            const result = await deleteVehicleById(2);
            expect(result).toBe(false);
        });
      
        it('returns false if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const result = await deleteVehicleById(1);
            expect(result).toBe(false);
        });
    });
});