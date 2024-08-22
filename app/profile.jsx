import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { useUserStore } from '../context/GlobalContext'
import { avatars } from '../constants';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const profile = () => {
    const { user, setUser, setIsLoggedIn } = useUserStore();
    const logout = () => {
        setUser('null')
        setIsLoggedIn(false)
        router.dismissAll()
        router.replace('/')
    }

    return (
        <SafeAreaView className="h-full bg-background">
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-5 my-10">
                    <View className="w-40 h-40 p-1 rounded-full bg-white justify-center items-center">
                        <Image 
                            source={avatars[`avatar${user.avatar ? user.avatar : 0}`]}
                            className="w-full h-full border"
                            resizeMode='contain'
                        />
                    </View>
                    <View className="w-full h-64 mt-7 rounded-2xl bg-gray-600 p-4 flex-col space-y-2">
                        <View className="flex-1 flex-row w-full justify-start items-center px-4 bg-gray-50 rounded-xl">
                            <Text className="text-xl text-primary-800 font-psemibold">Name</Text>
                            <Text className="text-base text-secondary-600 font-pregular mx-5">{user.name}</Text>
                        </View>
                        <View className="flex-1 flex-row w-full justify-start items-center px-4 bg-gray-50 rounded-xl">
                            <Text className="text-xl text-primary-800 font-psemibold">Nickname</Text>
                            <Text className="text-base text-secondary-600 font-pregular mx-5">{user.nickname}</Text>
                        </View>
                        <View className="flex-1 flex-row w-full justify-start items-center px-4 bg-gray-50 rounded-xl">
                            <Text className="text-xl text-primary-800 font-psemibold">Email</Text>
                            <Text className="text-base text-secondary-600 font-pregular mx-5">{user.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="mt-7 bg-red-600 w-40 h-10 rounded-lg justify-center items-center"
                        onPress={logout}
                    >
                        <Text className="text-lg text-white font-pbold">LogOut</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default profile