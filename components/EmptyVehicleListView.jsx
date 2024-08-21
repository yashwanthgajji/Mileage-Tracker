import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const EmptyVehicleListView = ({ containerStyles }) => {
  return (
    <View className={`justify-center items-center w-full h-[412px] flex-col space-y-4 ${containerStyles}`}>
      <Image
        source={images.road}
        className="w-36 h-36"
        resizeMode='contain'
      />
      <Text className="text-xl font-pregular text-primary-800 text-center px-4">Add a vehicle to start tracking its performance and refuelling</Text>
      <CustomButton
        title="Add Vehicle"
        handlePress={() => {router.push('/createVehicle')}}
        containerStyles="mt-7 w-[216px]"
        isRightShown = {true}
      />
    </View>
  )
}

export default EmptyVehicleListView