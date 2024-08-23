import { addUser, getUserById, getAllUsers } from '../data/UserStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('userStorage', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
  });

    describe('addUser', () => {
        it('adds a new user to the storage', async () => {
            const user = { id: 1, name: 'Yash G', nickname: 'hardrock123', email: 'yash@mileage.com' };
            await addUser(user);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('USERS', JSON.stringify([user]));
        });

        it('adds a new user to the existing users in storage', async () => {
            const existingUsers = [{ id: 1, name: 'Sree L' }];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingUsers));
            const user = { id: 2, name: 'Yash G', nickname: 'hardrock123', email: 'yash@mileage.com' };
            await addUser(user);
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('USERS', JSON.stringify([...existingUsers, user]));
        });
    });

    describe('getUserById', () => {
        it('returns the user with the given id', async () => {
            const users = [{ id: 1, name: 'Yash G', nickname: 'hardrock123', email: 'yash@mileage.com' }, { id: 2, name: 'Sree L', nickname: 'sai sree', email: 'sree@mileage.com' }];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(users));
            const user = await getUserById(1);
            expect(user).toEqual(users[0]);
        });

        it('returns null if user is not found', async () => {
            const users = [{ id: 1, name: 'Yash G', nickname: 'hardrock123', email: 'yash@mileage.com' }, { id: 2, name: 'Sree L', nickname: 'sai sree', email: 'sree@mileage.com' }];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(users));
            const user = await getUserById(3);
            expect(user).toBeNull();
        });

        it('returns null if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const user = await getUserById(1);
            expect(user).toBeNull();
        });
    });

    describe('getAllUsers', () => {
        it('returns all users in storage', async () => {
            const users = [{ id: 1, name: 'Yash G', nickname: 'hardrock123', email: 'yash@mileage.com' }, { id: 2, name: 'Sree L', nickname: 'sai sree', email: 'sree@mileage.com' }];
            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(users));
            const allUsers = await getAllUsers();
            expect(allUsers).toEqual(users);
        });

        it('returns an empty array if storage is empty', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const allUsers = await getAllUsers();
            expect(allUsers).toEqual([]);
        });
    });
});