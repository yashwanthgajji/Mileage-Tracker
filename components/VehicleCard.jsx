import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const VehicleCard = ({ containerStyles }) => {
    const hasVehicleImage = false
    return (
    <View className="w-80 h-56 rounded-2xl mt-3 justify-start items-center bg-orange-100 flex-col">
        <View className="w-full flex-1">
        { 
            hasVehicleImage ? (
                <View className="flex-col w-full h-full justify-center items-center bg-blue-50 rounded-2xl">
                    <Image 
                        source={images.bike}
                        className="h-[50%] w-[50%]"
                        resizeMode='contain'
                    />
                    <Text className="text-black-200 text-xl font-pmedium">No Image</Text>
                </View>
            ) : (
                <Image 
                    source={images.royalenfield} 
                    className="h-full w-full rounded-2xl"
                    resizeMode='cover'
                />
            )
        }
        </View>
        <View className="w-full flex-row items-center justify-start m-2 px-4 space-x-1">
            <View className="w-full flex-col items-start justify-center space-y-1 flex-1">
                <Text className="text-primary-800 text-base font-pregular">Royal Enfield</Text>
                <Text className="text-black-200 text-xs font-pmedium">2 Wheeler</Text>
            </View>
            <View>
                <Text className="text-black-200 text-lg font-pregular">155 CC</Text>
            </View>
        </View>
    </View>
  )
}

export default VehicleCard