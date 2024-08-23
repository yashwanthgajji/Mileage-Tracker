import { addRefuel, getRefuelById, getAllRefuelsByVehicleId, getTop5RefuelsByVehicleId, getAllRefuels } from '../data/RefuelStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Refuel Storage', () => {
    beforeEach(() => {
        AsyncStorage.getItem.mockClear();
        AsyncStorage.setItem.mockClear();
    });

    describe('addRefuel', () => {
        it('adds a new refuel to storage', async () => {
            const refuel = { id: 1, vehicleId: 1, fuel: 10, date: '23-08-2024', cost: '1000', totalKM: '560' };
            AsyncStorage.getItem.mockResolvedValue(null);
            await addRefuel(refuel);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('REFUELS', JSON.stringify([refuel]));
        });

        it('appends to existing refuels in storage', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 1, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1]));
            await addRefuel(refuel2);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('REFUELS', JSON.stringify([refuel1, refuel2]));
        });
    });

    describe('getRefuelById', () => {
        it('returns the refuel with the matching id', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 1, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1, refuel2]));
            const result = await getRefuelById(2);
            expect(result).toEqual(refuel2);
        });
      
        it('returns null if no refuel with the matching id is found', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1]));
            const result = await getRefuelById(2);
            expect(result).toBeNull();
        });
      
        it('returns null if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const result = await getRefuelById(1);
            expect(result).toBeNull();
        });
    });

    describe('getAllRefuelsByVehicleId', () => {
        it('returns all refuels for a specific vehicle id', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 1, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            const refuel3 = { id: 3, vehicleId: 2, fuel: 30, date: '24-08-2024', cost: '3100', totalKM: '700' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1, refuel2, refuel3]));
            const result = await getAllRefuelsByVehicleId(1);
            expect(result).toEqual([refuel2, refuel1]);
        });
      
        it('returns an empty array if no refuels are found for the vehicle id', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 2, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1, refuel2]));
            const result = await getAllRefuelsByVehicleId(3);
            expect(result).toEqual([]);
        });
      
        it('returns an empty array if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const result = await getAllRefuelsByVehicleId(1);
            expect(result).toEqual([]);
        });
    });

    describe('getTop5RefuelsByVehicleId', () => {
        it('returns the top 5 refuels for a specific vehicle id', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 1, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            const refuel3 = { id: 3, vehicleId: 1, fuel: 30, date: '24-08-2024', cost: '3100', totalKM: '700' };
            const refuel4 = { id: 4, vehicleId: 1, fuel: 40, date: '25-08-2024', cost: '4100', totalKM: '750' };
            const refuel5 = { id: 5, vehicleId: 1, fuel: 50, date: '26-08-2024', cost: '5100', totalKM: '800' };
            const refuel6 = { id: 6, vehicleId: 1, fuel: 60, date: '27-08-2024', cost: '6100', totalKM: '850' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1, refuel2, refuel3, refuel4, refuel5, refuel6]));
            const result = await getTop5RefuelsByVehicleId(1);
            expect(result).toEqual([refuel6, refuel5, refuel4, refuel3, refuel2]);
        });
      
        it('returns all refuels if there are less than 5 refuels for the vehicle id', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 1, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            const refuel3 = { id: 3, vehicleId: 1, fuel: 30, date: '24-08-2024', cost: '3100', totalKM: '700' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1, refuel2, refuel3]));
            const result = await getTop5RefuelsByVehicleId(1);
            expect(result).toEqual([refuel3, refuel2, refuel1]);
        });
      
        it('returns an empty array if no refuels are found for the vehicle id', async () => {
            const refuel1 = { id: 1, vehicleId: 2, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1]));
            const result = await getTop5RefuelsByVehicleId(1);
            expect(result).toEqual([]);
        });
      
        it('returns an empty array if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const result = await getTop5RefuelsByVehicleId(1);
            expect(result).toEqual([]);
        });
    });

    describe('getAllRefuels', () => {
        it('returns all refuels in storage', async () => {
            const refuel1 = { id: 1, vehicleId: 1, fuel: 10, date: '12-08-2024', cost: '1000', totalKM: '560' };
            const refuel2 = { id: 2, vehicleId: 1, fuel: 20, date: '23-08-2024', cost: '2100', totalKM: '650' };
            const refuel3 = { id: 3, vehicleId: 2, fuel: 30, date: '24-08-2024', cost: '3100', totalKM: '700' };
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify([refuel1, refuel2, refuel3]));
            const result = await getAllRefuels();
            expect(result).toEqual([refuel1, refuel2, refuel3]);
        });
      
        it('returns an empty array if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const result = await getAllRefuels();
            expect(result).toEqual([]);
        });
    });

});