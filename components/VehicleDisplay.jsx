import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const VehicleDisplay = ({ containerStyles }) => {
    const hasVehicleImage = true
    return (
    <View className={`w-96 h-56 rounded-2xl justify-center items-center bg-white ${containerStyles}`}>
        <View className="w-[97%] h-[95%] rounded-xl">
        { 
            hasVehicleImage ? (
                <View className="flex-col w-full h-full justify-center items-center bg-blue-50 rounded-xl">
                    <Image 
                        source={images.car}
                        className="h-[50%] w-[50%]"
                        resizeMode='contain'
                    />
                    <Text className="text-black-200 text-xl font-pmedium">No Image</Text>
                </View>
            ) : (
                <Image 
                    source={images.royalenfield} 
                    className="h-full w-full rounded-xl"
                    resizeMode='cover'
                />
            )
        }
        </View>
    </View>
  )
}

export default VehicleDisplay