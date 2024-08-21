import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = 'USERS';

export const addUser = async (user) => {
    try {
        const usersString = await AsyncStorage.getItem(USER_STORAGE_KEY);
        let users = [];
        if (usersString) {
            users = JSON.parse(usersString);
        }
        users.push(user);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
        console.log('User added successfully!');
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

export const getUserById = async (id) => {
    try {
        // Retrieve the users array from AsyncStorage
        const usersString = await AsyncStorage.getItem(USER_STORAGE_KEY);
        let users = [];
        if (usersString) {
            users = JSON.parse(usersString);
            const user = users.find((user) => user.id === id);
            return user
        } else {
            return null
        }
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        const usersString = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (usersString) {
            let users = JSON.parse(usersString);
            return users;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error getting all users:', error);
      return [];
    }
};