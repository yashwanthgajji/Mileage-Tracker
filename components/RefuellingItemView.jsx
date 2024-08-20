import { View, Text, Image } from 'react-native'
import React from 'react'

import {images} from '../constants'

const RefuellingItemView = ({containerStyles, date, fuel, cost}) => {
  return (
    <View className={containerStyles}>
    <View className={`bg-gray-100 w-full h-16 rounded-xl justify-start items-center flex-row mb-4`}>
        <Image 
            source={images.fuel}
            className="w-8 h-8 mx-4 flex-initial"
            resizeMode='contain'
        />
        <View className="flex-col items-start justify-center space-y-1">
            <Text className="text-primary-800 text-base font-psemibold">{date}</Text>
            <Text className="text-black-200 text-sm font-pmedium">{fuel}</Text>
        </View>
        <Text className="text-green-800 text-lg font-pregular ml-auto mr-4 flex-">{cost}</Text>
    </View>
    </View>
  )
}

export default RefuellingItemView