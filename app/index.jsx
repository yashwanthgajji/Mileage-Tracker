import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import {deleteAllRefuels} from './data/RefuelStorage'
import { getAllUsers } from './data/UserStorage'
import { useEffect } from 'react'

const index = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      if (users.length != 0) {
        router.replace('/sign-in');
      }
    };
    fetchUsers();
  }, []);

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[100px] h-[100px]"
          />
          <Text className="text-2xl mt-3 text-secondary-600 font-pextrabold">Mileage Tracker</Text>
          <Text className="text-xl text-primary-800 font-psemibold mt-12">Create an account to get started</Text>
          <CustomButton
            title="Sign Up"
            handlePress={ () => {router.push('/sign-up')} }
            containerStyles="w-full mt-4"
          />
          {/* <CustomButton
            title="Delete All Refuels"
            handlePress={ deleteAllRefuels }
            containerStyles="w-full mt-4"
          /> */}
          <Image
            source={images.homeImage}
            resizeMode='contain'
            className="w-[360px] h-[360px]"
          />
          <Text className="text-lg text-center text-primary-800 font-pregular px-8">Track your miles towards a prosperous financial journey!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index