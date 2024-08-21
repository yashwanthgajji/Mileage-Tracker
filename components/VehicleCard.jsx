import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const VehicleCard = ({ containerStyles, vehicle: {name, type, engine} }) => {
    const hasVehicleImage = false
    return (
    <View className="w-[356px] h-60 rounded-2xl my-3 justify-start items-center bg-orange-100 flex-col">
        <View className="w-full flex-1">
        { 
            hasVehicleImage ? (
                <Image 
                    source={images.royalenfield} 
                    className="h-full w-full rounded-2xl"
                    resizeMode='cover'
                />
            ) : (
                <View className="flex-col w-full h-full justify-center items-center bg-blue-50 rounded-2xl">
                    {
                        type == '2 Wheeler' && (
                            <Image 
                                source={images.bike}
                                className="h-[50%] w-[50%]"
                                resizeMode='contain'
                            />
                        )
                    }
                    {
                        type == '4 Wheeler' && (
                            <Image 
                                source={images.car}
                                className="h-[50%] w-[50%]"
                                resizeMode='contain'
                            />
                        )
                    }
                    <Text className="text-black-200 text-xl font-pmedium">No Image</Text>
                </View>  
            )
        }
        </View>
        <View className="w-full flex-row items-center justify-start m-2 px-6 space-x-1">
            <View className="w-full flex-col items-start justify-center space-y-1 flex-1">
                <Text className="text-primary-800 text-base font-pregular">{name}</Text>
                <Text className="text-black-200 text-xs font-pmedium">{type}</Text>
            </View>
            <View>
                <Text className="text-black-200 text-lg font-pregular">{engine} CC</Text>
            </View>
        </View>
    </View>
  )
}

export default VehicleCard