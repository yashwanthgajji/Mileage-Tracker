import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const VehicleDisplay = ({ containerStyles, vehicle: {picture, name, type, engine} }) => {
    return (
    <View className={`w-full h-56 rounded-2xl justify-center items-center bg-white ${containerStyles}`}>
        <View className="w-[97%] h-[95%] rounded-xl">
        { 
            picture ? (
                <Image 
                    source={{uri: picture.uri}} 

                    className="h-full w-full rounded-xl"
                    resizeMode='cover'
                />
            ) : (
                <View className="flex-col w-full h-full justify-center items-center bg-blue-50 rounded-xl">
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
                        type == '3 Wheeler' && (
                            <Image 
                                source={images.auto}
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
                    {
                        type == 'Other' && (
                            <Image 
                                source={images.steering}
                                className="h-[50%] w-[50%]"
                                resizeMode='contain'
                            />
                        )
                    }
                    <Text className="text-black-200 text-xl font-pmedium mt-4">No Image</Text>
                </View>
            )
        }
        </View>
    </View>
  )
}

export default VehicleDisplay